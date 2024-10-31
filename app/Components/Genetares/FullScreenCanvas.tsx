import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import convertImageToBase64 from "@/helpers/convertImageToBase64";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Patterns/Buttons";
import CardDopdown from "./CardDopdown";
import { clearState } from "@/lib/features/image/imageSlice";

const FullScreenCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const { defaultImgSrc } = useSelector((state: { image: any }) => state.image);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = useRef<fabric.Canvas | null>(null);
  const [renderedImage, setRenderedImage] = useState<any>("");
  const [openCards, setOpenCards] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(200); // Set a default width
  const [height, setHeight] = useState(200); // Set a default height

  const renderCanvas = async () => {
    if (!canvasRef.current) return;

    // Fabric Canvas'i oluşturma
    if (canvas.current === null) {
      canvas.current = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        selection: false,
        isDrawingMode: false,
        backgroundColor: "transparent",
      });
      // canvas.current.freeDrawingBrush = new fabric.PencilBrush(canvas.current);
      // canvas.current.freeDrawingBrush.width = 20;
      // canvas.current.freeDrawingBrush.color = "black";

      canvas.current.on("object:selected", () => {
        canvas.current?.discardActiveObject();
      });

      canvas.current.on("path:created", (opt: any) => {
        if (!opt.path.dirty) {
          opt.selected = false;
        }
      });
    }

    // Resim yükleme ve Canvas'e ekleme
    let sourceUrl: string = `/images/${defaultImgSrc}.png`;
    if (sourceUrl.startsWith("http")) {
      sourceUrl = (await convertImageToBase64(sourceUrl)) as string;
    }

    fabric.Image.fromURL(
      sourceUrl,
      (img) => {
        if (!canvas.current || !img) return;
        img.set({
          left: 200,
          top: 50,
          selectable: true,
        });
        setRenderedImage(img);
        canvas?.current?.zoomToPoint({ x: 0, y: 50 }, 0.3);

        console.log("canvas.current", canvas.current);
        canvas.current.add(img);
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    );

    canvas.current.on("mouse:wheel", (event: any) => {
      if (!canvas.current) return;
      const delta = event.e.deltaY;
      let zoom = canvas.current.getZoom();
      zoom *= 0.999 ** delta;

      if (zoom > 5) zoom = 5;
      if (zoom < 0.01) zoom = 0.01;

      canvas.current.zoomToPoint(
        { x: event.pointer.x, y: event.pointer.y },
        zoom
      );
      event.e.preventDefault();
      event.e.stopPropagation();
    });

    canvas.current.on("mouse:move", (event: any) => {
      if (!canvas.current) return;
      canvas.current.relativePan({ x: 0, y: 0 });
    });
  };

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
  };

  useEffect(() => {
    renderCanvas();

    //Canvas temizleme
    return () => {
      canvas.current?.dispose();
    };
  }, []);

  useEffect(() => {
    renderCanvas();

    //Canvas temizleme
    return () => {
      canvas.current?.dispose();
    };
  }, [defaultImgSrc]);
  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        className='w-full h-screen bg-transparent'
        width={1920}
        height={1000}
        id='canvas'
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
        {/* <Button
          className='bg-blue-500 flex items-center justify-center rounded-md w-8 max-w-[32px] h-8 font-din mt-4 hover:scale-[1.05]'
          onClick={() => setUpscaleCanvas(true)}
          iconSize={20}
          tooltip='Upscale'
          iconLeft='tdesign:upscale'
        /> */}
      </div>
    </div>
  );
};

export default FullScreenCanvas;

const cardList = [
  {
    id: "1",
    name: "Blue Gold",
    color: "#fbffb2",
    columnColor: "#101f3d",
  },
  {
    id: "2",
    name: "Gold",
    color: "#000000",
    columnColor: "#CFB95C",
  },
];
