import Galleries from "@/helpers/dbModels/galleryModel";
import Users from "@/helpers/dbModels/userModel";
import verifyUser from "@/helpers/middleware/verify.middleware";
import { NextApiRequest, NextApiResponse } from "next";
type ReqProps = {
  page: string;
  perPage: string;
  query: any;
  cookies: any;
  method: any;
};
const handler = async (
  req: NextApiRequest | ReqProps,
  res: NextApiResponse
) => {
  const { page = "1", perPage = "10" } = req.query;

  const pg = parseInt(page);
  const pp = parseInt(perPage);

  const token = req.cookies.token;

  // TODO: Yetki Kontrolü: token yoksa servise erişilemez
  if (!token) {
    return res.status(401).json({ message: "Giriş yetkiniz bulunmamaktadır!" });
  }
  const data = verifyUser(token);
  if (!data) {
    return res
      .status(401)
      .json({ message: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." });
  }
  // TODO: Method Kontrolü: GET methodu dışındaki istekleri engeller.
  if (req.method !== "GET") {
    return res.status(425).json({ message: "Method Yanlış" });
  }

  try {
    const user = await Users.findOne({ _id: data });
    if (!user) {
      return res.json({ message: "Böyle Bir Kullanıcı Bulunamıyor" });
    }

    const galleries = await Galleries.find({ userId: user._id });

    const pagedGalleries = [...galleries].slice((pg - 1) * pp, pg * pp);
    const resultList = pagedGalleries.map((i) => {
      return {
        image: i.image,
        title: i.title,
        id: i._id,
      };
    });
    return res.status(200).json({
      resultList,
      total: galleries.length,
      page: parseInt(page),
      perPage: parseInt(perPage),
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
