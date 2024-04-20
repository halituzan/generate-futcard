export function svgToBase64(svgUrl, callback) {
    // SVG dosyasını indirin
    fetch(svgUrl)
        .then(response => response.blob())
        .then(blob => {
            // Blob'u Base64'e dönüştürün
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                // Base64 verisini geri çağırın
                const base64data = reader.result;
                callback(base64data);
            };
        })
        .catch(error => console.error('SVG dosyasını indirme hatası:', error));
}