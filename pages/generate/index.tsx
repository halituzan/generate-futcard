import React, { useEffect, useRef, useState } from "react";
import "../../app/globals.css";
const DrawingBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [defaultImgSrc, setDefaultImgSrc] = useState<string | null>(
    "/images/soccer-card-blue-gold.png"
  );
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(200); // Set a default width
  const [height, setHeight] = useState(200); // Set a default height

  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
        setStartX(0);
        setStartY(0);
        setOffsetX(0);
        setOffsetY(0);
        setWidth(200); // Reset width to default
        setHeight(200); // Reset height to default

        // Store the original dimensions of the image
        const img = new Image();
        img.onload = () => {
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

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
          ctx.drawImage(defaultImg, 0, 0, canvas.width, canvas.height);

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
    <div className="flex flex-col h-screen">
      <div className="m-4">
        <label className="bg-red-600 rounded-md p-2" htmlFor="add-image">
          Add Image
        </label>
        <input
          id="add-image"
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />
      </div>

      <canvas
        style={{ border: "1px solid red" }}
        className="flex-1 h-96  min-w-48 max-w-[600px]"
        ref={canvasRef}
        width={400}
        height={750}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div className="mt-10">
        <button className="bg-red-600 rounded-md p-2" onClick={handleSaveImage}>
          Save Image
        </button>
      </div>
    </div>
  );
};

export default DrawingBoard;
