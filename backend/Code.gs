/**
 * Backend para "Trazador de Lotes" — Google Apps Script
 * -----------------------------------------------------
 * Qué hace cuando alguien envía el formulario de correo desde la app:
 *   1) Agrega una fila nueva a tu Google Sheet (Fecha, Correo, NPN del lote, Dirección, Barrio, Comuna).
 *   2) Envía un correo al destinatario con el plano (DXF/CAD) adjunto.
 *
 * SETUP (una sola vez): ver SETUP.md en esta misma carpeta.
 */

// (Opcional) Si el script NO está vinculado a un Sheet, pon aquí el ID del Sheet.
// El ID es la parte larga de la URL:  https://docs.google.com/spreadsheets/d/<ESTE_ID>/edit
var SHEET_ID = '';                 // <- déjalo vacío si usas un script vinculado (Extensiones > Apps Script)
var SHEET_NAME = 'Registros';

function _sheet() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Fecha', 'Correo', 'NPN del lote', 'Dirección', 'Barrio', 'Comuna']);
  }
  return sh;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1) Registrar en el Sheet (una fila nueva por cada envío)
    _sheet().appendRow([
      new Date(),
      data.email || '',
      data.lotId || '',
      data.direccion || '',
      data.barrio || '',
      data.comuna || ''
    ]);

    // 2) Enviar el correo con el plano adjunto (SVG + DXF)
    if (data.email && (data.svg || data.dxf)) {
      var attachments = [];
      if (data.svg) {
        attachments.push(Utilities.newBlob(Utilities.base64Decode(data.svg), 'image/svg+xml', data.svgname || 'plano.svg'));
      }
      if (data.dxf) {
        attachments.push(Utilities.newBlob(Utilities.base64Decode(data.dxf), 'application/octet-stream', data.filename || 'mapa.dxf'));
      }
      MailApp.sendEmail({
        to: data.email,
        subject: 'Plano del lote ' + (data.lotId || '') + (data.direccion ? ' — ' + data.direccion : ''),
        body: 'Hola,\n\nAdjunto el plano de la zona con el lote seleccionado resaltado y sus medidas reales.\n\n' +
              'Identificador del lote (NPN): ' + (data.lotId || 's/d') + '\n' +
              'Dirección: ' + (data.direccion || '') + '\n' +
              'Barrio: ' + (data.barrio || '') + (data.comuna ? ' (Comuna ' + data.comuna + ')' : '') + '\n\n' +
              'Adjuntos:\n' +
              '  • plano .svg → se abre con doble clic en cualquier navegador; se puede imprimir o guardar como PDF.\n' +
              '  • plano .dxf → para AutoCAD, QGIS o cualquier software CAD (en AutoCAD: "Guardar como" .dwg).\n\n' +
              '— Enviado desde Trazador de Lotes',
        attachments: attachments
      });
    }

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return _json({ ok: true, service: 'Trazador de Lotes backend' });
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
