import Main from "@/pages";
import React, { useEffect, useRef, useState } from "react";
import DrawingBoard from "./DrawingBoard";

import Network from "@/helpers/Network";
import axios from "axios";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, uploadImage } from "@/lib/features/image/imageSlice";
import Button from "../Patterns/Buttons";
import TextInput from "../Patterns/TextInput";
import Variables from "./Variables";

const Generate = () => {
  const uploadInput = useRef<HTMLInputElement>(null);

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
          await getFiles();
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
      <div className='flex items-start flex-1'>
        <div className='card-area rounded-md w-1/2 bg-slate-light'>
          <DrawingBoard />
        </div>
        <div className='upload-area flex-1 w-1/2 pl-4 flex flex-col'>
          <div className='flex w-full justify-between'>
            <Button
              onClick={upload}
              text='Yükle'
              iconLeft='solar:gallery-send-bold-duotone'
              color='bg-blue-500'
              className='w-full rounded-b-none'
            />
            <input
              type='file'
              className='hidden'
              accept='image/png, image/jpeg'
              ref={uploadInput}
              onChange={(e) => {
                if (e.target.files) {
                  uploadImageHandler(e.target.files[0]);
                }
              }}
            />
          </div>

          <div className='flex flex-wrap bg-blue-100/50'>
            {fileList.map(
              (item: { id: string; title: string; image: string }) => {
                return (
                  <div key={item.id} className='p-2 w-1/4 h-32 relative'>
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
            )}
            {selectedImage && <Variables selectedImage={selectedImage} />}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Generate;
