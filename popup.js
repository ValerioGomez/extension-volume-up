document.getElementById("volume-range").addEventListener("input", function() {
    const volume = this.value;
    const volumeValue = document.getElementById("volume-value");
    volumeValue.textContent = volume; // Actualiza el valor mostrado en el popup

    // Ejecutar el script en la pestaña activa para ajustar el volumen
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: setVolume,
            args: [volume]
        });
    });
});

function setVolume(volume) {
    // Asegúrate de que el volumen no exceda 1 (100%)
    const normalizedVolume = Math.min(volume / 600, 1);

    // Asegúrate de que todos los videos y audios reciban el volumen ajustado
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach(el => {
        el.volume = normalizedVolume;
    });

    // Si no hay elementos de audio/video, no hacer nada
    if (mediaElements.length === 0) {
        console.log('No se encontraron elementos de audio o video.');
    }
}
