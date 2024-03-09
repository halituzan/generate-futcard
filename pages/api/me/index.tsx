import User from "@/helpers/dbModels/userModel";
import connectDB from "@/helpers/dbConnect";
import verifyUser from "@/helpers/middleware/verify.middleware";
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
    const user = await User.findOne({ _id: data });
    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Giriş Yetkiniz Bulunmamaktadır.", status: false });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      isActive: user.isActive,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: "OPPSS! Bir şeyler yanlış gitti.", status: false });
  }
};
export default handler;
