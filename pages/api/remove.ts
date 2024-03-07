import { NextApiRequest, NextApiResponse } from "next";
const { removeBackground } = require("@imgly/background-removal-node");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  const baseUrl = "http://localhost:3000/";

  try {
    const blob = await removeBackground(baseUrl + "/uploads/" + url);
    const buffer = Buffer.from(await blob.arrayBuffer());
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
    res.json({ data: dataURL });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
