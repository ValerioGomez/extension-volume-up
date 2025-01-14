document.getElementById("volume-range").addEventListener("input", function() {
    const volumeValue = document.getElementById("volume-value");
    volumeValue.textContent = this.value; // Actualiza el valor mostrado en el popup
});

document.getElementById("apply-volume").addEventListener("click", async () => {
    const volume = document.getElementById("volume-range").value;

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
    const videoElements = document.querySelectorAll("video, audio");
    if (videoElements.length === 0) {
        alert("No se encontraron elementos de audio/video en esta página.");
        return;
    }

    videoElements.forEach(el => {
        el.volume = Math.min(volume / 100, 1); // El volumen no puede exceder 1 (100%).
        el.playbackRate = volume > 100 ? volume / 100 : 1; // Aumenta el audio con el playbackRate si necesario.
    });

    alert(`El volumen se ha ajustado a ${volume}%`);
}
