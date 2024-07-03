import "@/Assets/css/globals.css";
import { clearState } from "@/lib/features/image/imageSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Patterns/Buttons";
import { blueGold } from "./Cards/BlueCard/blueGold";
// import { frame } from "./Cards/BlueCard/frame";
import { v4 as uuidv4 } from "uuid";
import CardDopdown from "./CardDopdown";
import { valuesGenerate } from "./Cards/BlueCard/values";

const DrawingBoard = ({
  upscaleCanvas,
  setUpscaleCanvas,
}: {
  upscaleCanvas: any;
  setUpscaleCanvas: any;
}) => {
  const [openCards, setOpenCards] = useState(false);
  const [zoom, setZoom] = useState(1);
  const clamp = (num: number, min: number, max: number) =>
    Math.min(Math.max(num, min), max);
  const SCROLL_SENSITIVITY = 0.0005;
  const MAX_ZOOM = 10;
  const MIN_ZOOM = 0.3;
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    color,
    columnColor,
  } = result;
  const handleClickOutside = (event: MouseEvent) => {
    if (!dropdownRef.current) return;
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      console.log("Clicked outside");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  const handleWheel = (event: any) => {
    const { deltaY } = event;
    if (!dragging) {
      setZoom((zoom) =>
        clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM)
      );
    }
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      // Canvastan data url oluşturuyorum.
      const dataURL = canvas?.toDataURL("image/png");

      // İndirme bağlantısı create ediyorum.
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = uuidv4();

      // oluşturduğum bağlantıyı tetikleyerek indirme işlemini başlatıyorum.
      link.click();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth: number = canvas?.width;
    const canvasHeight: number = canvas?.height;
    if (canvas && defaultImgSrc) {
      const ctx = canvas.getContext("2d");
      //* Zoom eventi
      // ctx?.scale(zoom, zoom);
      if (ctx) {
        // Varsayılan görüntüyü yalnızca bileşen bağlandığında çizer
        const defaultImg = new Image();
        defaultImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(defaultImg, 100, 0, canvas.width - 200, canvas.height);
          valuesGenerate(
            ctx,
            canvasWidth,
            canvasHeight,
            totalPoint,
            color,
            name,
            position,
            pac,
            pas,
            def,
            sho,
            dri,
            phy
          );
          // Girilen görüntüyü hesaplanan boyutlarla çizer
          if (imgSrc) {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, offsetX, offsetY, width, height);
            };
            img.src = imgSrc;
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
          // frame(ctx, canvas, svgData);
        };
        blueGold(ctx, canvas.width, canvas.height, color, columnColor);

        defaultImg.src = "/images/" + defaultImgSrc + ".png";
      }

      if (!canvas) return;
      canvas.addEventListener("wheel", handleWheel);
      return () => {
        canvas.removeEventListener("wheel", handleWheel);
      };
    }
  }, [
    handleWheel,
    defaultImgSrc,
    result,
    imgSrc,
    offsetX,
    offsetY,
    width,
    height,
    dragging,
    resizing,
    svgData,
  ]);

  const handleCoords = () => {
    //* Resmi canvas üzerinde doğru konuma yerleştirir
    if (!canvasRef.current) return;
    const canvasWidth: number = canvasRef.current?.width / 2;
    const canvasHeight: number = canvasRef.current?.height / 2;

    setOffsetX(canvasWidth + 40 - width / 2);
    setOffsetY(canvasHeight + 50 - height - 33);
  };

  const handleClear = () => {
    //* Canvası Temizler
    dispatch(clearState());
    console.log(result);
  };

  return (
    <div className='relative '>
      <canvas
        className='p-10 w-full rounded-t-lg shadow-[inset_0_0_20px_2px_rgba(0,0,0,0.1)]'
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
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

      <div className='button-list flex flex-col absolute top-2 left-2'>
        <div className='relative'>
          <Button
            className='bg-blue-500 flex items-center justify-center rounded-md w-8 p-1 max-w-[32px] h-8 font-din  hover:scale-[1.05]'
            onClick={() => {
              setOpenCards(true);
            }}
            iconSize={20}
            tooltip='Clear Canvas'
            iconLeft='formkit:select'
          />
          {openCards && (
            <CardDopdown setOpenCards={setOpenCards} cardList={cardList} />
          )}
        </div>
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

      <div className='button-list flex flex-col absolute bottom-12 left-2'>
        <Button
          className='bg-blue-500 flex items-center justify-center rounded-md w-8 max-w-[32px] h-8 font-din mt-4 hover:scale-[1.05]'
          onClick={() => setUpscaleCanvas(true)}
          iconSize={20}
          tooltip='Upscale'
          iconLeft='tdesign:upscale'
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
const svgData = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 28.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="katman_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 600 600" style="enable-background:new 0 0 600 600;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F5E380;}
</style>
<path class="st0" d="M300,513.6l-3.4-5.5c-1.7-2.7-10-9.2-47.3-22.7c-23.4-8.4-49.2-16.3-61.7-20.1l-0.3-0.1
	c-4.1-1.3-7.1-2.2-8.6-2.7c-13.2-4.3-16.7-12.6-17.1-13.6l-0.3-0.7V133.6l3.3-0.5c0.2,0,17.6-3.2,36.5-19.1
	c21-17.7,51.8-31.1,66.3-32.2l4.9-0.3l-0.7,4.9c0,0,0,0,0,0c0,0-0.1,1.1,0.6,1.9c0.8,1,2.7,1.5,5.3,1.5c7.4,0,16.5-8.8,19.3-12.2
	l3-3.6l3,3.6c2.8,3.4,11.9,12.2,19.3,12.2c2.5,0,4.2-0.5,5.1-1.5c0.8-1,0.7-2.4,0.7-2.4l-0.7-4.8l4.9,0.3
	c14.3,1,45.1,14.6,66.5,32.6c18.9,16,36.4,19.1,36.5,19.1l3.3,0.5l0,3.4v311.3l-0.3,0.7c-0.1,0.4-3.7,9.1-17.1,13.6
	c-1.5,0.5-4.4,1.4-8.4,2.6l-0.5,0.2c-12.4,3.8-38.3,11.7-61.7,20.1c-37.3,13.4-45.6,19.9-47.3,22.7L300,513.6z M165.8,447.4
	c0.3,0.8,3.4,7.3,14.4,11c1.5,0.5,4.5,1.4,8.5,2.7l0.3,0.1c43.8,13.4,102.6,32.5,111,44.2c8.5-11.7,67.3-30.8,111-44.2l0.5-0.2
	c4-1.2,6.8-2.1,8.3-2.6c11-3.6,14.1-10.2,14.4-11V137.3c-2.5-0.5-19.7-4.4-38.3-20c-20.5-17.3-49.7-30.4-63.5-31.6
	c0.1,1,0,3.4-1.7,5.3c-1.7,2-4.5,3-8.4,3c-10.2,0-20.4-11.2-22.3-13.4c-1.9,2.2-12.1,13.4-22.3,13.4c-3.9,0-6.8-1-8.5-2.9
	c-1.6-1.8-1.7-4-1.7-4.9c-14,1.2-43.3,14.1-63.4,31.1c-18.5,15.6-35.8,19.5-38.3,20V447.4z"/>
</svg>`;
const cardList = [
  {
    id: 1,
    name: "Blue Gold",
    color: "#fbffb2",
    columnColor: "#101f3d",
  },
  {
    id: 2,
    name: "Gold",
    color: "#000000",
    columnColor: "#CFB95C",
  },
];
