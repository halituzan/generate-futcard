const writeText = (ctx: any, info: any, style: any = {}, value?: any) => {
  if (!ctx) return;
  const { text, x, y } = info;
  const {
    fontSize = 32,
    color,
    textAlign = "center",
    textBaseline = "top",
  } = style;
  if (!ctx) return;
  ctx.beginPath();
  ctx.font = fontSize + "px " + "'DIN-Condensed-Bold', sans-serif";
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  if (value) {
    const xAxis = textAlign === "left" ? 40 : textAlign === "right" ? 60 : "";
    ctx.fillText(value, x + xAxis, y);
  }

  ctx.stroke();
};

export const valuesGenerate = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  totalPoint?: any,
  color?: any,
  name?: any,
  position?: any,
  pac?: any,
  pas?: any,
  def?: any,
  sho?: any,
  dri?: any,
  phy?: any
) => {
  //* Total Point
  const xTotalPoint = canvasWidth * 0.3383334; // 203
  const yTotalPoint = canvasHeight * 0.15; // 90
  writeText(
    ctx,
    { text: totalPoint, x: xTotalPoint, y: yTotalPoint },
    {
      fontSize: 80,
      color: color,
      textAlign: "center",
      textBaseline: "top",
    }
  );
  //* Position
  const xPosition = canvasWidth * 0.33334; // 200
  const yPosition = canvasHeight * 0.25834; // 155
  writeText(
    ctx,
    { text: position, x: xPosition, y: yPosition },
    {
      fontSize: 40,
      color: color,
      textAlign: "center",
      textBaseline: "top",
    }
  );
  //* Name
  const xName = canvasWidth * 0.5; // 300
  const yName = canvasHeight * 0.55; // 330
  writeText(
    ctx,
    { text: name, x: xName, y: yName },
    {
      fontSize: 60,
      color: color,
      textAlign: "center",
      textBaseline: "top",
    }
  );
  //* PAC
  const xPac = canvasWidth * 0.26667; // 160
  const yPac = canvasHeight * 0.68334; // 410
  writeText(
    ctx,
    { text: pac, x: xPac, y: yPac },
    {
      fontSize: 40,
      color: color,
      textAlign: "left",
      textBaseline: "left",
    },
    "PAC"
  );
  //* SHO
  const xSho = canvasWidth * 0.26667; // 160
  const ySho = canvasHeight * 0.741668; // 445
  writeText(
    ctx,
    { text: sho, x: xSho, y: ySho },
    {
      fontSize: 40,
      color: color,
      textAlign: "left",
      textBaseline: "left",
    },
    "SHO"
  );
  //* PAS
  const xPas = canvasWidth * 0.26667; // 160
  const yPas = canvasHeight * 0.8; // 480
  writeText(
    ctx,
    { text: pas, x: xPas, y: yPas },
    {
      fontSize: 40,
      color: color,
      textAlign: "left",
      textBaseline: "left",
    },
    "PAS"
  );
  //* DRI
  const xDri = canvasWidth * 0.583334; // 350
  const yDri = canvasHeight * 0.68334; // 410
  writeText(
    ctx,
    { text: dri, x: xDri, y: yDri },
    {
      fontSize: 40,
      color: color,
      textAlign: "left",
      textBaseline: "left",
    },
    "DRI"
  );
  //* DEF
  const xDef = canvasWidth * 0.583334; // 350
  const yDef = canvasHeight * 0.741668; // 445
  writeText(
    ctx,
    { text: def, x: xDef, y: yDef },
    {
      fontSize: 40,
      color: color,
      textAlign: "left",
      textBaseline: "left",
    },
    "DEF"
  );
  //* PHY
  const xPhy = canvasWidth * 0.583334; // 350
  const yPhy = canvasHeight * 0.8; // 480
  writeText(
    ctx,
    { text: phy, x: xPhy, y: yPhy },
    {
      fontSize: 40,
      color: color,
      textAlign: "left",
      textBaseline: "left",
    },
    "PHY"
  );
};
