import { clearState } from "@/lib/features/image/imageSlice";
import { fabric } from "fabric";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Patterns/Buttons";
import CardDopdown from "./CardDopdown";
import { bottomLines, upperLines } from "./Cards/BlueCard/blueGold";

const FullScreenCanvas: React.FC = () => {
  const dispatch = useDispatch();
  const result = useSelector((state: { image: any }) => state.image);
  const {
    defaultImgSrc,
    color,
    columnColor,
    totalPoint,
    name,
    position,
    pac,
    pas,
    def,
    sho,
    dri,
    phy,
    flag,
    team,
    image,
  } = result;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = useRef<fabric.Canvas | null>(null);
  const [renderedImage, setRenderedImage] = useState<any>("");
  const [openCards, setOpenCards] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [width, setWidth] = useState(200); // Set a default width
  const [height, setHeight] = useState(200); // Set a default height
  console.log("image", image);

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
    // let sourceUrl: string = ;

    // sourceUrl = (await convertImageToBase64(sourceUrl)) as string;

    fabric.Image.fromURL(
      `/images/${defaultImgSrc}.png`,
      async (img) => {
        if (!canvas.current || !img) return;
        img.set({
          left: 0,
          top: 0,
          selectable: true,
          name: "currentImage",
        });
        setRenderedImage(img);
        const { width = 0, height = 0 } = img;

        canvas?.current?.zoomToPoint({ x: 0, y: 50 }, 0.1);
        if (!canvas.current || !img) return;
        const upper = await upperLines(
          width,
          height,
          color,
          columnColor,
          totalPoint,
          position,
          flag,
          team
        );
        const bottom = bottomLines(
          width,
          height,
          color,
          name,
          pac,
          pas,
          def,
          sho,
          dri,
          phy
        );

        const group = new fabric.Group([img, upper, bottom], {
          left: img.left,
          top: img.top,
          selectable: true,
        });

        canvas.current.add(group);
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
  useEffect(() => {
    renderCanvas();
    //Canvas temizleme
    return () => {
      canvas.current?.dispose();
    };
  }, []);

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
  const handleSaveImage = () => {
    if (canvas && canvas.current) {
      // Canvastan data url oluşturuyorum.

      const dataURL = canvas.current._activeObject.toDataURL({
        format: "png",
        quality: 1,
      });

      // İndirme bağlantısı create ediyorum.
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "asdasdasd";

      // oluşturduğum bağlantıyı tetikleyerek indirme işlemini başlatıyorum.
      link.click();
    }
  };

  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        className='w-full h-screen bg-transparent'
        width={1920}
        height={1000}
        id='canvas'
      />
      <div className='absolute bottom-0 right-1/2'>
        <Button
          className='bg-blue-500 w-full rounded-t-none text-xl font-din'
          onClick={handleSaveImage}
          iconLeft='ant-design:save-twotone'
          text='Save'
        />
      </div>
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
            <CardDopdown
              setOpenCards={setOpenCards}
              cardList={cardList}
              renderCanvas={() => {
                canvas.current?.clear();
                renderCanvas();
              }}
            />
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
