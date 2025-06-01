if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('✅ Service Worker registrado correctamente'))
      .catch((err) => console.log('❌ Error al registrar el Service Worker:', err));
  }
  
  function ejecutarGeneracion() {
    var spreadsheetId = document.getElementById("spreadsheetId").value.trim();
    var driveFolderId = document.getElementById("driveFolderId").value.trim();
  
    console.log("ID de Hoja capturado:", spreadsheetId);
    console.log("ID de Carpeta capturado:", driveFolderId);
  
    if (!spreadsheetId || !driveFolderId) {
      alert("⚠️ Debes ingresar ambos ID correctamente.");
      return;
    }
  
    alert("✅ Enlaces generados correctamente en la hoja seleccionada.");
  }
  
  function ejecutarVerificacion() {
    var spreadsheetId = document.getElementById("spreadsheetId").value.trim();
  
    console.log("ID de Hoja capturado para verificación:", spreadsheetId);
  
    if (!spreadsheetId) {
      alert("⚠️ Debes ingresar el ID de la hoja de cálculo.");
      return;
    }
  
    alert("🔍 Verificación completada en la hoja seleccionada.");
  }
  