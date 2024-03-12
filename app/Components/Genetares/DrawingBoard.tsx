import "@/Assets/css/globals.css";
import { clearState } from "@/lib/features/image/imageSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Patterns/Buttons";
const DrawingBoard: React.FC = () => {
  const dispatch = useDispatch();
  const result = useSelector((state: { image: any }) => state.image);

  const {
    position,
    totalPoint,
    pac,
    sho,
    pas,
    dri,
    def,
    phy,
    name,
    flag,
    team,
    defaultImgSrc,
  } = result;

  const imgSrc = result.image;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(200); // Set a default width
  const [height, setHeight] = useState(200); // Set a default height

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();

    if (rect) {
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      setStartX(mouseX);
      setStartY(mouseY);
      setDragging(true);

      // Check if resizing handles are active
      const resizeHandleSize = 10;
      const rightHandle = width - (mouseX - offsetX) <= resizeHandleSize;
      const bottomHandle = height - (mouseY - offsetY) <= resizeHandleSize;

      if (rightHandle || bottomHandle) {
        setResizing(true);
      }
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (dragging) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const deltaX = mouseX - startX;
        const deltaY = mouseY - startY;

        setStartX(mouseX);
        setStartY(mouseY);

        if (resizing) {
          // Resize the image based on mouse movement
          const newWidth = Math.max(width + deltaX, 50); // Minimum width is  50
          const newHeight = Math.max(height - deltaY, 50); // Minimum height is  50

          // Update the state with the new dimensions
          setWidth(newWidth);
          setHeight(newHeight);
          if (!ctx) return;
          ctx.strokeStyle = "#f00"; // some color/style
          ctx.lineWidth = 2;
          ctx.strokeRect(offsetX, offsetY, width, height);
        } else {
          // Move the image based on mouse movement
          setOffsetX(offsetX + deltaX);
          setOffsetY(offsetY + deltaY);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Create a data URL from the canvas
      const dataURL = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas_image.png";

      // Trigger a click on the link to start the download
      link.click();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvasRef.current) return;
    const canvasWidth: number = canvasRef.current?.width;
    const canvasHeight: number = canvasRef.current?.height;
    if (canvas && defaultImgSrc) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Varsayılan görüntüyü yalnızca bileşen bağlandığında çizer
        const defaultImg = new Image();
        defaultImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(defaultImg, 100, 0, canvas.width - 200, canvas.height);
          ctx.beginPath();
          ctx.fillStyle = "#fbffb2";
          ctx.fillRect(168, 193, 65, 2);
          ctx.fillRect(168, 250, 65, 2);

          // Girilen görüntüyü hesaplanan boyutlarla çizer
          if (imgSrc) {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, offsetX, offsetY, width, height);
            };
            img.src = imgSrc;

            //* Total Point
            const xTotalPoint = canvasWidth * 0.3383334; // 203
            const yTotalPoint = canvasHeight * 0.15; // 90
            writeText(
              { text: totalPoint, x: xTotalPoint, y: yTotalPoint },
              {
                fontSize: 80,
                color: "#fbffb2",
                textAlign: "center",
                textBaseline: "top",
              }
            );
            //* Position
            const xPosition = canvasWidth * 0.33334; // 200
            const yPosition = canvasHeight * 0.25834; // 155
            writeText(
              { text: position, x: xPosition, y: yPosition },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "center",
                textBaseline: "top",
              }
            );
            //* Position
            const xName = canvasWidth * 0.5; // 300
            const yName = canvasHeight * 0.55; // 330
            writeText(
              { text: name, x: xName, y: yName },
              {
                fontSize: 60,
                color: "#fbffb2",
                textAlign: "center",
                textBaseline: "top",
              }
            );
            //* PAC
            const xPac = canvasWidth * 0.26667; // 160
            const yPac = canvasHeight * 0.68334; // 410
            writeText(
              { text: pac, x: xPac, y: yPac },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "PAC"
            );
            //* SHO
            const xSho = canvasWidth * 0.26667; // 160
            const ySho = canvasHeight * 0.741668; // 445
            writeText(
              { text: sho, x: xSho, y: ySho },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "SHO"
            );
            //* PAS
            const xPas = canvasWidth * 0.26667; // 160
            const yPas = canvasHeight * 0.8; // 480
            writeText(
              { text: pas, x: xPas, y: yPas },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "PAS"
            );
            //* DRI
            const xDri = canvasWidth * 0.583334; // 350
            const yDri = canvasHeight * 0.68334; // 410
            writeText(
              { text: dri, x: xDri, y: yDri },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "DRI"
            );
            //* DEF
            const xDef = canvasWidth * 0.583334; // 350
            const yDef = canvasHeight * 0.741668; // 445
            writeText(
              { text: def, x: xDef, y: yDef },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "DEF"
            );
            //* PHY
            const xPhy = canvasWidth * 0.583334; // 350
            const yPhy = canvasHeight * 0.8; // 480
            writeText(
              { text: phy, x: xPhy, y: yPhy },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "PHY"
            );
          }
          if (flag) {
            let flagImage = new Image();
            flagImage.onload = () => {
              const xPosition = canvasWidth * 0.284; // 170
              const yPosition = canvasHeight * 0.333; // 200

              ctx.drawImage(
                flagImage,
                xPosition,
                yPosition,
                canvasWidth / 10,
                canvasHeight / 13.335
              );
            };
            flagImage.src = flag;
          }
          if (team) {
            const xPosition = canvasWidth * 0.29165; // 175
            const yPosition = canvasHeight * 0.425; // 255

            let teamImage = new Image();
            teamImage.onload = () => {
              ctx.drawImage(
                teamImage,
                xPosition,
                yPosition,
                canvasWidth / 11,
                canvasHeight / 11
              );
            };
            teamImage.src = team;
          }
        };
        defaultImg.src = "/images/" + defaultImgSrc + ".png";
      }
    }
  }, [
    defaultImgSrc,
    result,
    imgSrc,
    offsetX,
    offsetY,
    width,
    height,
    dragging,
    resizing,
  ]);

  const writeText = (info: any, style: any = {}, value?: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { text, x, y } = info;
    const {
      fontSize = 32,
      color = "#fbffb2",
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

  const handleCoords = () => {
    //* Resmi canvas üzerinde doğru konuma yerleştirir
    if (!canvasRef.current) return;
    const canvasWidth: number = canvasRef.current?.width / 2;
    const canvasHeight: number = canvasRef.current?.height / 2;

    setOffsetX(canvasWidth + 40 - width / 2);
    setOffsetY(canvasHeight + 50 - height - 34);
  };

  const handleClear = () => {
    //* Canvası Temizler
    dispatch(clearState());
    console.log(result);
  };

  return (
    <div className='relative '>
      <canvas
        className='w-full p-10 rounded-t-lg shadow-[inset_0_0_20px_2px_rgba(0,0,0,0.1)]'
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <Button
        className='bg-blue-500 w-full rounded-t-none text-xl font-din'
        onClick={handleSaveImage}
        iconLeft='ant-design:save-twotone'
        text='Save'
      />
      <div className='button-list flex flex-col absolute top-2 right-2'>
        <Button
          className='bg-blue-500 flex items-center justify-center rounded-md w-8 max-w-[32px] h-8 font-din hover:scale-[1.05]'
          onClick={handleCoords}
          iconSize={20}
          tooltip='Position The Image'
          iconLeft='vaadin:absolute-position'
        />
      </div>
      <div className='button-list flex flex-col absolute bottom-12 right-2'>
        <Button
          className='bg-blue-500 flex items-center justify-center rounded-md w-8 max-w-[32px] h-8 font-din mt-4 hover:scale-[1.05]'
          onClick={handleClear}
          iconSize={20}
          tooltip='Clear Canvas'
          iconLeft='material-symbols-light:mop'
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
