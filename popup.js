document.getElementById("volume-range").addEventListener("input", async function() {
    const volume = this.value;
    const volumeValue = document.getElementById("volume-value");
    volumeValue.textContent = volume; // Actualiza el valor mostrado en el popup

    // Ejecutar el script en la pestaña activa para ajustar el volumen
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: setVolume,
            args: [volume]
        });
    }
});

function setVolume(volume) {
    // Normalizamos el volumen a un rango de 0 a 1
    const normalizedVolume = Math.min(volume / 600, 1);  // Limita el volumen a 1 (100%)
    
    // Selecciona todos los elementos de audio y video en la página
    const mediaElements = document.querySelectorAll('audio, video');
    
    if (mediaElements.length > 0) {
        mediaElements.forEach(el => {
            el.volume = normalizedVolume; // Ajusta el volumen
        });
    } else {
        console.log('No se encontraron elementos de audio o video.');
    }
}
