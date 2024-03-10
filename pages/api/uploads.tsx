import { NextApiRequest, NextApiResponse } from "next";
const fd = require("formidable");
import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import verifyUser from "@/helpers/middleware/verify.middleware";
import Users from "@/helpers/dbModels/userModel";
import { v4 as uuidv4 } from "uuid";
import Galleries from "@/helpers/dbModels/galleryModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = verifyUser(req.cookies.token);


  const form = new fd.IncomingForm();
  form.on("file", async (field: any, file: any) => {
    // Dosyanın MIME türünü kontrolü
    if (!file.mimetype) {
      return res
        .status(400)
        .json({ error: "Yalnızca resim dosyaları kabul edilir." });
    }
    try {
      const user = await Users.findOne({ _id: data });

      // Kullanıcının dosyalarını saklamak için klasör yolu
      const userFolderPath = path.join("public/uploads/", user.userName);

      // Kullanıcının klasörü yoksa oluştur
      await fsPromises.mkdir(userFolderPath, { recursive: true });

      // Dosyanın yeni adı (rastgele UUID)
      const randomFileName = uuidv4();

      // Dosyanın Uzantısını Alıyoruz
      const fileOriginal = file.originalFilename.split(".");
      const fileType = "." + fileOriginal[fileOriginal.length - 1];

      // Dosyanın yeni yolu
      const newPath = path.join(userFolderPath, randomFileName + fileType);

      // Dosyayı taşı
      fs.rename(file.filepath, newPath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Dosya kaydedilemedi." });
        }
        // Dosya başarıyla kaydedildi
        fs.access(newPath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error("Dosya mevcut değil:", err);
          } else {
            console.log("Dosya mevcut.");
          }
        });
      });

      // Database'e kaydet
      const newGallery = new Galleries({
        userId: user._id,
        fileName: randomFileName + fileType,
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
    } catch (error) {
      console.log(error);
    }
  });

  form.parse(
    req,
    (err: any, fields: any, files: Record<string, formidable.File>) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // Dosya yükleme işlemi tamamlandı
      res.status(200).json({ message: "Dosya başarıyla yüklendi." });
    }
  );
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
