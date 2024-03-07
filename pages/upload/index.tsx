import axios from "axios";
import React, { useState } from "react";

const RemoveBackground: React.FC = () => {
  const [img, setImg] = useState<any>(null);
  const [responseImage, setResponseImage] = useState("");

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
    // const image = await toBase64(img);
    const url = img.name;

    const formData = new FormData();
    formData.append("image", img);

    try {
      await axios.post("api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { data } = await axios.post("/api/remove", { url });
      setResponseImage(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "100vw", backgroundColor: "gray", height: "100vh" }}>
      <input
        type='file'
        onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={removeBg}>Kaydet</button>
      <div style={{ width: "500px" }}>
        {responseImage && (
          <img src={responseImage} alt='' style={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
