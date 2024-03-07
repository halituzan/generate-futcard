import axios from "axios";
import React, { useState } from "react";

const { imglyRemoveBackground } = require("@imgly/background-removal");

const RemoveBackground: React.FC = () => {
  const [img, setImg] = useState<any>(null);
  const [responseImage, setResponseImage] = useState("");
  console.log(responseImage);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const removeBg = async () => {
    if (!img) {
      console.error("No file selected");
      return;
    }
    const image = await toBase64(img);
    console.log(image);

    console.log(URL.createObjectURL(img));
    const url = img.name;
    console.log(url);

    const formData = new FormData();
    formData.append("file", img);

    try {
      const { data } = await axios.post("/api/remove", { file: url });
      setResponseImage(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   const removeBg = async () => {
  //     // var reader = new FileReader();
  //     // reader.readAsText(img);
  //     // console.log(reader);

  //     imglyRemoveBackground(img).then((blob: Blob) => {
  //       const url = URL.createObjectURL(blob);

  //       return url;
  //     });
  //   };

  return (
    <div>
      <input
        type='file'
        onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={removeBg}>Kaydet</button>
      {responseImage && <img src={responseImage} alt='' />}
    </div>
  );
};

export default RemoveBackground;
