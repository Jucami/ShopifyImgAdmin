const CLIENT_ID = "1022956321226-krodsp8ho34t04safiq6qeicmn7nukcd.apps.googleusercontent.com";
const API_KEY = "AIzaSyD1o7bW1WR8Ddqg09DOEjx4EDX48IjKZc0";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets";

function iniciarAutenticacion() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(() => {
      gapi.auth2.getAuthInstance().signIn();
      alert("✅ Autenticación exitosa.");
    }).catch(error => console.error("Error de autenticación:", error));
  });
}

function listarArchivosDrive() {
  const folderId = document.getElementById("driveFolderId").value.trim();
  if (!folderId) {
    alert("⚠️ Debes ingresar un ID de carpeta válido.");
    return;
  }

  gapi.client.drive.files.list({
    q: `'${folderId}' in parents`,
    fields: "files(id, name)"
  }).then(response => {
    const archivos = response.result.files;
    let lista = "<h3>Archivos en Drive:</h3><ul>";
    archivos.forEach(file => {
      lista += `<li>${file.name} - <a href="https://drive.google.com/uc?id=${file.id}" target="_blank">Ver archivo</a></li>`;
    });
    lista += "</ul>";
    document.getElementById("resultadoDrive").innerHTML = lista;
  }).catch(error => console.error("Error al listar archivos:", error));
}

function leerDatosGoogleSheets() {
  const sheetId = document.getElementById("spreadsheetId").value.trim();
  if (!sheetId) {
    alert("⚠️ Debes ingresar un ID de hoja válido.");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:D10?key=${API_KEY}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let tabla = "<h3>Datos en Sheets:</h3><table border='1'>";
      data.values.forEach(row => {
        tabla += "<tr>" + row.map(cell => `<td>${cell}</td>`).join("") + "</tr>";
      });
      tabla += "</table>";
      document.getElementById("resultadoSheets").innerHTML = tabla;
    })
    .catch(error => console.error("Error al leer datos de Sheets:", error));
}

function escribirDatosGoogleSheets() {
  const sheetId = document.getElementById("spreadsheetId").value.trim();
  if (!sheetId) {
    alert("⚠️ Debes ingresar un ID de hoja válido.");
    return;
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A2:append?valueInputOption=RAW&key=${API_KEY}`;
  
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: [["Nuevo dato", "Ejemplo"]] })
  }).then(response => response.json())
    .then(result => {
      alert("✅ Datos agregados correctamente.");
    })
    .catch(error => console.error("Error al escribir en Sheets:", error));
}
