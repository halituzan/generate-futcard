export const frame = (ctx: any, canvas: any, svgData: string) => {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, -150, -100,900,800);
  };

  img.src = "data:image/svg+xml," + encodeURIComponent(svgData);
};
