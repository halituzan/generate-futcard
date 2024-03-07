import axios from "axios";
import React, { useState } from "react";

import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";

const RemoveBackground: React.FC = () => {
  const [img, setImg] = useState<any>(null);
  //   async function removeImageBackground(imgSource: any) {
  //     try {
  //       // Removing background
  //       const blob = await removeBackground(imgSource);

  //       // Converting Blob to buffer
  //       const buffer = Buffer.from(await blob.arrayBuffer());

  //       // Generating data URL
  //       const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;

  //       // Returning the data URL
  //       return dataURL;
  //     } catch (error) {
  //       // Handling errors
  //       throw new Error("Error removing background: " + error);
  //     }
  //   }

  const removeBg = async () => {
    console.log(URL.createObjectURL(img));
    // try {
    //   // Removing background from the input image
    //   const resultDataURL = await removeImageBackground(path);
    //   // Writing the result to a file (optional)
    //   fs.writeFileSync("output.png", resultDataURL.split(";base64,").pop(), {
    //     encoding: "base64",
    //   });
    //   // Logging success message
    //   console.log("Background removed successfully.");
    // } catch (error: any) {
    //   // Logging error message
    //   console.error("Error:", error.message);
    // }
  };

  return (
    <div>
      <input
        type='file'
        onChange={(e) => {
          setImg(e.target.files ? e.target.files[0] : null);
        }}
      />
      <button onClick={removeBg}>Kaydet</button>
    </div>
  );
};

export default RemoveBackground;
