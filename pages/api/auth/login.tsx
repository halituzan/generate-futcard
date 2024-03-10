import Users from "@/helpers/dbModels/userModel";
import connectDB from "@/helpers/dbConnect";
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import cookie from "cookie";

connectDB();

const handler = async (req: any, res: any) => {
  const jwtSecret: any = process.env.NEXT_PUBLIC_JWT_SECRET;
  const { userName, password } = req.body;
  try {
    // Check if user exists
    const user = await Users.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Bu kullanıcı adı mevcut değil.", status: false });
    }
    console.log(user.isActive);

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Email veya Şifreniz Yanlış", status: false });
    }
    // Check if verify is correct
    if (!user.isActive) {
        return res.status(400).json({ message: "Üyeliğiniz Onaylanmamıştır.", status: false });
    } else {
      // Create and sign JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "7d", // Set your desired expiration time
      });

      // Set the token in a cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 86400 * 7, // 1 day in seconds
          path: "/", // Set the cookie path as needed
        })
      );

      res.status(200).json({
        message: "Giriş Başarılı",
        status: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "OPPSS! Bir şeyler yanlış gitti.", status: false });
  }
};
export default handler;
