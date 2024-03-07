import { NextApiRequest, NextApiResponse } from "next";
const fd = require("formidable");
import fs from "fs";
import path from "path";
import formidable from "formidable";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new fd.IncomingForm();
  form.on("file", (field: any, file: any) => {
    // Dosyanın MIME türünü kontrol edin

    if (!file.mimetype) {
      return res
        .status(400)
        .json({ error: "Yalnızca resim dosyaları kabul edilir." });
    }
    const newPath = path.join("public/uploads", file.originalFilename);

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
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
