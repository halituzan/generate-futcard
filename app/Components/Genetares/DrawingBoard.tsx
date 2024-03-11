import React, { useEffect, useRef, useState } from "react";
import "@/Assets/css/globals.css";
import { useSelector } from "react-redux";
import Button from "../Patterns/Buttons";
const DrawingBoard: React.FC = () => {
  const result = useSelector((state: { image: any }) => state.image);

  const { position, totalPoint, pac, sho, pas, dri, def, phy, name, flag } =
    result;
  const imgSrc = result.image;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [defaultImgSrc, setDefaultImgSrc] = useState<string | null>(
    "/images/soccer-card-blue-gold.png"
  );

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(200); // Set a default width
  const [height, setHeight] = useState(200); // Set a default height

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setStartX(0);
  //       setStartY(0);
  //       setOffsetX(0);
  //       setOffsetY(0);
  //       setWidth(200); // Reset width to default
  //       setHeight(200); // Reset height to default

  //       // Store the original dimensions of the image
  //       const img = new Image();
  //       img.onload = () => {
  //         setOriginalWidth(img.width);
  //         setOriginalHeight(img.height);
  //       };
  //       img.src = e.target?.result as string;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // };

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
            writeText(
              { text: totalPoint, x: 203, y: 90 },
              {
                fontSize: 80,
                color: "#fbffb2",
                textAlign: "center",
                textBaseline: "top",
              }
            );
            writeText(
              { text: position, x: 200, y: 155 },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "center",
                textBaseline: "top",
              }
            );
            writeText(
              { text: name, x: 300, y: 330 },
              {
                fontSize: 60,
                color: "#fbffb2",
                textAlign: "center",
                textBaseline: "top",
              }
            );
            //* PAC
            writeText(
              { text: pac, x: 160, y: 410 },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "PAC"
            );
            //* SHO
            writeText(
              { text: sho, x: 160, y: 445 },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "SHO"
            );
            //* PAS
            writeText(
              { text: pas, x: 160, y: 480 },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "PAS"
            );
            //* DRI
            writeText(
              { text: dri, x: 350, y: 410 },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "DRI"
            );
            //* DEF
            writeText(
              { text: def, x: 350, y: 445 },
              {
                fontSize: 40,
                color: "#fbffb2",
                textAlign: "left",
                textBaseline: "left",
              },
              "DEF"
            );
            //* PHY
            writeText(
              { text: phy, x: 350, y: 480 },
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
            const flagImage = new Image();
            flagImage.onload = () => {
              ctx.drawImage(flagImage, 170, 200, 60, 45);
            };
            flagImage.src = flag;
          }
        };
        defaultImg.src = defaultImgSrc;
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

  return (
    <>
      <canvas
        className='w-full p-10 shadow-[inset_0_0_20px_2px_rgba(0,0,0,0.1)]'
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <Button
        className='bg-blue-500 w-full rounded-t-none'
        onClick={handleSaveImage}
        text='Print'
      />
    </>
  );
};

export default DrawingBoard;
