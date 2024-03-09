import axios from "axios";
import React, { useState } from "react";

type Props = {
  img: any;
  responseImage: any;
};

const Upload = ({ img, responseImage }: Props) => {
  const uploadImage = async () => {
    if (!img) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", img);

    try {
      await axios.post("api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={uploadImage}>Kaydet</button>
      <div style={{ width: "500px" }}>
        {responseImage && (
          <img src={responseImage} alt='' style={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
};

export default Upload;
