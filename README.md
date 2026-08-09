# Trazador de Lotes · CRM Inmobiliario · Catastro Cali

Web app para gestionar propiedades a partir de una foto: detecta las coordenadas GPS de la
imagen, te muestra los **lotes del catastro de Cali en planta** para seleccionar cuál es, y
guarda el lote con su ficha, comunicaciones (CRM), documentos y contacto de WhatsApp.

## Cómo abrir

**Opción recomendada (evita bloqueos del navegador):**
1. Doble clic en **`Iniciar app.bat`**.
2. Se abrirá el navegador en `http://localhost:5178`.
   (Requiere tener Node.js instalado — ya lo tienes.)

**Opción rápida:** doble clic en `index.html`. Funciona igual, pero algunos navegadores
restringen la carga de datos externos al abrir archivos locales; si los lotes no cargan, usa
el `.bat`.

## Qué hace

| Función | Detalle |
|--------|---------|
| 📷 **Foto → GPS** | Lee las coordenadas EXIF de la foto y ubica el punto en el mapa. Si no tiene GPS, puedes escribir las coordenadas o hacer clic en el mapa. |
| 🔢 **N.º de imagen** | Se detecta automáticamente del nombre del archivo. Botón **"Leer número"** para leer con OCR un número visible dentro de la foto. |
| 🗺️ **Lotes del catastro** | Carga los lotes reales de Cali (IDESC / GeoServer, capa `catastro:cat_bas_terrenos`) alrededor del punto. Haz clic en el lote correcto para seleccionarlo. Trae NPN, dirección, barrio, comuna, manzana/terreno y destinación. |
| 👤 **Dueño / contacto** | Nombre, correo, teléfono y notas. |
| 💚 **WhatsApp** | Detecta el número, le antepone el indicativo de Colombia (+57) y abre el chat de WhatsApp al presionar el botón. |
| 💬 **CRM** | Registra cada comunicación con el dueño (llamada, WhatsApp, visita, correo, nota) con fecha y detalle. |
| 📄 **Documentos** | Sube el predial, certificado de tradición, escritura, etc. Se guardan y se pueden ver/descargar. |
| 📐 **Enviar plano DXF por correo** | Al seleccionar un lote, escribe un correo y la app genera un **plano CAD (DXF)** con los lotes de alrededor y el lote seleccionado resaltado + su identificador (NPN), lo **envía por correo** y **registra el correo + ID del lote en un Google Sheet** (una fila nueva por cada envío). Requiere el backend de Apps Script (ver `backend/SETUP.md`). Sin backend, descarga el DXF localmente. |
| 💾 **Guardado** | Todo queda en tu navegador (IndexedDB). Botones **Backup / Restaurar** para exportar e importar una copia (`.json`). |

## Envío por correo + registro en Google Sheet (opcional)

La función de "Enviar plano DXF por correo" necesita un pequeño backend gratuito de **Google
Apps Script** (se despliega una vez bajo tu cuenta de Google). Hace dos cosas: envía el DXF al
correo indicado y agrega una fila a tu Google Sheet por cada persona que llene el formulario.

- Código: [`backend/Code.gs`](backend/Code.gs)
- Instrucciones paso a paso: [`backend/SETUP.md`](backend/SETUP.md)

Cuando tengas la URL del backend (`…/exec`), pégala en la app con el botón **⚙️ Correo**.

> **DWG vs DXF:** el plano se genera en **DXF**, el formato de intercambio de AutoCAD (no es
> posible generar DWG binario desde el navegador). El `.dxf` se abre en AutoCAD, QGIS o
> cualquier CAD, y en AutoCAD puedes "Guardar como" `.dwg` en un clic.

## Datos del catastro

Fuente: **IDESC – Infraestructura de Datos Espaciales de Santiago de Cali** (GeoServer público).
- Endpoint: `https://ws-idesc.cali.gov.co/geoserver/catastro/ows`
- Capa de lotes: `catastro:cat_bas_terrenos`

Si el servidor de la Alcaldía está temporalmente caído, la app te avisa y podrás seguir
seleccionando la ubicación manualmente en el mapa.

## Archivos

- `index.html` — la aplicación completa (todo en un archivo).
- `server.js` — mini-servidor local sin dependencias.
- `Iniciar app.bat` — lanzador para Windows.
