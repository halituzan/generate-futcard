import Main from "@/pages";
import { useEffect, useRef, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import Network from "@/helpers/Network";
import { Icon } from "@iconify/react";
import axios from "axios";
import Button from "../Patterns/Buttons";
import Variables from "./Variables";
import FullScreenCanvas from "./FullScreenCanvas";
import DrawingBoard2 from "./DrawingBoard2";

const Generate = () => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const [upscaleCanvas, setUpscaleCanvas] = useState(false);
  const [genareteInputsOpen, setGenareteInputsOpen] = useState(true);

  const [selectedImage, setSelectedImage] = useState({
    id: "",
    image: "",
  });
  const [fileList, setFileList] = useState([]);
  const upload = () => {
    if (!uploadInput.current) return;
    uploadInput.current.click();
  };

  const uploadImageHandler = async (img: any) => {
    if (!img) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", img);

    try {
      await axios
        .post("api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          const response = await Network.getData("/api/user/g/galleries");
          setFileList(response.resultList);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getFiles = async () => {
    try {
      const res = await Network.getData("/api/user/g/galleries");
      setFileList(res.resultList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Main>
      <div className='flex flex-col lg:flex-row items-start flex-1'>
        <div
          className='canvas  w-full h-screen bg-slate-light'
          // onClick={() => setGenareteInputsOpen(true)}
        >
          <FullScreenCanvas />
        </div>
      </div>

      {genareteInputsOpen && (
        <div
          className={`upload-area flex-1 flex w-[300px] flex-col items bg-white absolute right-0 top-0 h-screen p-2 pt-4 transition-all ${
            genareteInputsOpen
              ? "translate-x-0 w-[300px]"
              : "translate-x-full w-0"
          }`}
        >
          <div className='w-full flex justify-end items-end'>
            <Button
              className='bg-blue-500 rounded-md w-8 max-w-[32px] h-8 font-din hover:scale-[1.05] mb-2'
              onClick={() => setGenareteInputsOpen(false)}
              iconSize={20}
              tooltip='Close Drawer'
              iconLeft='tabler:circle-dashed-x'
            />
          </div>
          <div className='flex w-full justify-between'>
            <Button
              onClick={upload}
              text='Upload'
              iconLeft='solar:gallery-send-bold-duotone'
              color='bg-blue-500'
              className='w-full rounded-b-none font-din '
            />
            <input
              type='file'
              className='hidden'
              accept='image/png, image/jpeg'
              ref={uploadInput}
              onChange={(e) => {
                if (e.target.files) {
                  console.log(e.target.files[0]);

                  uploadImageHandler(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className='flex flex-col bg-blue-100/50'>
            <div className='flex flex-wrap'>
              {fileList.length > 0 ? (
                fileList.map(
                  (item: { id: string; title: string; image: string }) => {
                    return (
                      <div key={item.id} className='p-2 w-20 h-20 relative'>
                        <img
                          className={`w-full h-full object-cover hover:scale-[1.05] transition-all hover:shadow-sm rounded-md cursor-pointer
                    ${
                      selectedImage.id === item.id
                        ? "border-2 border-blue-500"
                        : "border border-transparent"
                    }
                    `}
                          onClick={() => {
                            if (selectedImage.id === item.id) {
                              setSelectedImage({
                                id: "",
                                image: "",
                              });
                            } else {
                              setSelectedImage(item);
                            }
                          }}
                          src={item.image}
                          alt={item.title}
                        />
                      </div>
                    );
                  }
                )
              ) : (
                <div
                  onClick={upload}
                  className='p-2 flex justify-center items-center h-32 relative cursor-pointer'
                >
                  <Icon
                    icon='solar:gallery-send-bold-duotone'
                    className='mr-2 text-blue-500'
                    fontSize={30}
                  />
                  <p className='font-din text-2xl'>Please add a picture.</p>
                </div>
              )}
            </div>
            {selectedImage.id && <Variables selectedImage={selectedImage} />}
          </div>
        </div>
      )}

      {upscaleCanvas && (
        <div className='w-screen h-screen fixed top-0 left-0 bg-white flex flex-col'>
          <div className='h-10 flex justify-end items-center px-2 border-b border-b-blue-500'>
            <Icon
              icon='fa6-solid:rectangle-xmark'
              fontSize={"1.4rem"}
              className='text-blue-500 cursor-pointer'
              onClick={() => setUpscaleCanvas(false)}
            />
          </div>
          <div className='flex-1'>
            <DrawingBoard
              upscaleCanvas={upscaleCanvas}
              setUpscaleCanvas={setUpscaleCanvas}
            />
          </div>
        </div>
      )}
    </Main>
  );
};

export default Generate;
