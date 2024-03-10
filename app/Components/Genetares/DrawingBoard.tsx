import React, { useEffect, useRef, useState } from "react";
import "@/Assets/css/globals.css";
import Main from "@/pages";
import { useSelector } from "react-redux";
const DrawingBoard: React.FC = () => {
  const resultImage = useSelector((state: { image: string }) => state.image);

  const imgSrc = resultImage.image;
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
        // Draw the default image only when the component mounts
        const defaultImg = new Image();
        defaultImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(defaultImg, 0, 0, canvas.width - 200, canvas.height);

          // Draw the input-added image with the calculated dimensions
          if (imgSrc) {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, offsetX, offsetY, width, height);
          
            };
            img.src = imgSrc;
          }
        };
        defaultImg.src = defaultImgSrc;
      }
    }
  }, [
    defaultImgSrc,
    imgSrc,
    offsetX,
    offsetY,
    width,
    height,
    dragging,
    resizing,
  ]);

  return (
    <>
      <canvas
        className='w-full p-10'
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={handleSaveImage}>Çıktı al</button>
    </>
  );
};

export default DrawingBoard;
