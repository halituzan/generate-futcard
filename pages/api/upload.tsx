import { NextApiRequest, NextApiResponse } from "next";
import { getFile, uploadFile } from "@/lib/storage/storage";
import verifyUser from "@/helpers/middleware/verify.middleware";
const fd = require("formidable");
import Galleries from "@/helpers/dbModels/galleryModel";
import Users from "@/helpers/dbModels/userModel";
import { Blob } from "buffer";
import fs from "fs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new fd.IncomingForm();
  const data = verifyUser(req.cookies.token);

  form.on("file", async (field: any, file: any) => {
   console.log(file);
   
    const buffer = fs.readFileSync(file.filepath);
    const blob = new Blob([buffer]);

    // Dosyanın MIME türünü kontrolü
    if (!file.mimetype.startsWith("image")) {
      return res
        .status(400)
        .json({ message: "Yalnızca resim dosyaları kabul edilir." });
    }
    try {
      const user = await Users.findOne({ _id: data });
      const imagePath = await uploadFile(blob, user.userName, file);
      await getFile(imagePath).then(async (res: any) => {
        const image = res;
        // Database'e kaydet
        const newGallery = await new Galleries({
          image,
          userId: user._id,
          title: file.originalFilename,
        });

        await newGallery
          .save()
          .then((gallery: any) => {
            return Galleries.findById(gallery._id).populate("userId");
          })
          .catch((error: any) => {
            console.error("Hata:", error);
          });
      });
    } catch (error: any) {
      console.log(error);
    }
  });

  form.on("end", () => {
    // Dosya yükleme işlemi tamamlandı
    res.status(200).json({ message: "Dosya başarıyla yüklendi." });
  });

  form.parse(req);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
