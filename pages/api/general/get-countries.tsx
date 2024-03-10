import connectDB from "@/helpers/dbConnect";
import verifyUser from "@/helpers/middleware/verify.middleware";
import Countries from "@/helpers/dbModels/countryModel";
connectDB();

const handler = async (req: any, res: any) => {
  const token = req.cookies.token;
  if (!token) {
    // Check token exists
    res
      .status(401)
      .json({ message: "Oturumunuz açık değiltir.", status: false });
    return;
  }
  const data = verifyUser(token);
  if (!data) {
    // Check token exists
    res.status(401).json({
      message: "Oturumunuz süresi dolmuştur. Lütfen tekra giriş yapın.",
      status: false,
    });
    return;
  }
  try {
    const countries = await Countries.find({});
    // Check if user exists

    res.status(200).json({
      data: countries,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "OPPSS! Bir şeyler yanlış gitti.", status: false });
  }
};
export default handler;
