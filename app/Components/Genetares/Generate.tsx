import Main from "@/pages";
import React, { useRef, useState } from "react";
import DrawingBoard from "./DrawingBoard";
import Button from "../Patterns/Buttons";
import Upload from "./Upload";
import Network from "@/helpers/Network";

const Generate = () => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<any>(null);
  const [responseImage, setResponseImage] = useState("");
  const uploadImage = () => {
    setResponseImage("");
    if (!uploadInput.current) return;
    uploadInput.current.click();
  };

  const removeBg = async () => {
    try {
      const { data } = await Network.postData("/api/remove", { url: img.name });
      setResponseImage(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <div className='flex items-start flex-1'>
        <div className='card-area rounded-md w-1/2 bg-slate-light'>
          <DrawingBoard />
        </div>
        <div className='upload-area flex-1 w-1/2 pl-4 flex flex-col'>
          <div className='flex w-full justify-between'>
            <Button
              onClick={uploadImage}
              text='Yükle'
              iconLeft='solar:gallery-send-bold-duotone'
              color='bg-blue-500 w-full'
            />
            <input
              type='file'
              className='hidden'
              accept='image/png, image/jpeg'
              ref={uploadInput}
              onChange={(e) =>
                setImg(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <Upload img={img} responseImage={responseImage} />
        </div>
      </div>
    </Main>
  );
};

export default Generate;
