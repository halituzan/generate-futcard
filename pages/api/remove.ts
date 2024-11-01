import { removeBackground } from "@imgly/background-removal-node";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.body;
  console.log("url", url);

  try {
    const blob = await removeBackground(url);
    const buffer = Buffer.from(await blob.arrayBuffer());
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
    res.json({ data: dataURL });
  } catch (error) {
    console.log(error);
  }
};

export default handler;
