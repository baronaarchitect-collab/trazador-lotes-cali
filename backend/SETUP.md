# Setup del envío por correo + registro en Google Sheet (una sola vez, ~3 min)

Esto activa dos cosas de la app:
- Enviar el plano **DXF** al correo que se escriba.
- Guardar una **fila nueva en tu Google Sheet** por cada persona que envíe el formulario (Fecha, Correo, NPN del lote, Dirección, Barrio, Comuna).

## Pasos

1. **Crea el Google Sheet**
   - Ve a https://sheets.new (crea una hoja nueva). Ponle un nombre, p. ej. *Registros Lotes*.

2. **Abre el editor de Apps Script**
   - En esa hoja: menú **Extensiones → Apps Script**.

3. **Pega el código**
   - Borra lo que haya en `Código.gs` y pega **todo** el contenido de [`Code.gs`](Code.gs).
   - Guarda (💾). No necesitas cambiar `SHEET_ID` porque el script queda vinculado a esta hoja.

4. **Despliega como aplicación web**
   - Botón azul **Implementar → Nueva implementación**.
   - Engranaje ⚙️ → tipo **Aplicación web**.
   - Configura:
     - *Descripción*: `Trazador de Lotes`
     - *Ejecutar como*: **Yo (tu correo)**
     - *Quién tiene acceso*: **Cualquier persona**  ← importante
   - **Implementar**. Acepta los permisos que pide (enviar correo y editar la hoja). Google mostrará un aviso "no verificado" → *Configuración avanzada → Ir a (proyecto) → Permitir*.

5. **Copia la URL**
   - Copia la **URL de la aplicación web** (termina en `/exec`).

6. **Pégala en la app**
   - En la app (Trazador de Lotes), arriba a la derecha: **⚙️ Correo** → pega la URL → OK.

¡Listo! Desde ahora, al seleccionar un lote y escribir un correo → "Enviar", se manda el DXF y se registra la fila en tu Sheet.

## Notas
- Si cambias el código, usa **Implementar → Gestionar implementaciones → editar → Nueva versión** (la URL `/exec` se mantiene).
- Cuota gratuita de correos de Apps Script: ~100/día (cuenta gratuita) o ~1500/día (Workspace). Suficiente para este uso.
- Si prefieres un script **no vinculado** a la hoja, pon el ID del Sheet en la variable `SHEET_ID` dentro de `Code.gs`.
