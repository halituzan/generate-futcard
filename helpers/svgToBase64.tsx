export function svgToBase64(svgUrl:any, callback:any) {
    // SVG dosyasını indiriyoruz
    fetch(svgUrl)
        .then(response => response.blob())
        .then(blob => {
            // Blob'u Base64'e dönüştürüyoruz
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                // Base64 verisini geri çağırıyoruz
                const base64data = reader.result;
                callback(base64data);
            };
        })
        .catch(error => console.error('SVG dosyasını indirme hatası:', error));
}