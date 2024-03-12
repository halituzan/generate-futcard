export const blueGold = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number
) => {
  ctx.beginPath();
  var grd = ctx.createLinearGradient(350, 100, 380, 380);
  grd.addColorStop(0, "rgba(16, 31, 61, 0)");
  grd.addColorStop(1, "rgba(16, 31, 61, 1)");
  ctx.fillStyle = grd;
  ctx.fillRect(canvasWidth * 0.275, 75, 70, 240);
  ctx.beginPath();
  ctx.fillStyle = "#fbffb2";
  ctx.fillRect(canvasWidth * 0.28, canvasHeight * 0.3216, 65, 2);
  ctx.fillRect(canvasWidth * 0.28, canvasHeight * 0.41666, 65, 2);
  ctx.fillRect(canvasWidth * 0.27, 385, 276, 4);
  ctx.fillRect(canvasWidth * 0.4965, 405, 5, 110);
  ctx.fillRect(canvasWidth * 0.45, 532, 58, 4);
};


