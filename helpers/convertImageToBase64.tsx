// Resmi Base64'e dönüştürmek için bir fonksiyon
export default async function convertImageToBase64(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width / 5;
      canvas.height = img.height / 5;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width / 5, img.height / 5);
        const base64Data = canvas.toDataURL("image/png"); // veya "image/jpeg" vb.
        resolve(base64Data);
      }
    };
    img.onerror = reject;
    img.src = url;
  });
}
