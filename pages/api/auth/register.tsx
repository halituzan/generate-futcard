import Users from "@/helpers/dbModels/userModel";
import connectDB from "@/helpers/dbConnect";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import Galleries from "@/helpers/dbModels/galleryModel";
const bcrypt = require("bcryptjs");

connectDB();

const handler = async (req: any, res: any) => {
  const { firstName, lastName, email, password, userName } = req.body;
  const jwtSecret: any = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!firstName || !lastName || !email || !password || !userName) {
    res.json({
      message: "Lütfen gerekli alanları doldurun!",
      status: false,
    });
  }

  try {
    // Check if user already exists

    const user = await Users.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (user?.email === email)
      res.json({
        message: "Bu Email İle Kullanıcı Mevcut",
        status: false,
      });

    if (user?.userName === userName)
      res.json({
        message: "Bu kullanıcı adı ile kullanıcı mevcut",
        status: false,
      });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userName,
    });
    await newUser.save();

    // Create and sign JWT token
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "1d", // Set your desired expiration time
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

    res
      .status(201)
      .json({ message: "Kullanıcı Başarıyla Oluşturuldu", status: true });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Bu e-posta adresi zaten kayıtlıdır" });
    } else {
      return res.status(500).json({
        message: "Veritabanı Bağlantısı Hatası Lütfen Bizimle İletişime Geçin",
      });
    }
  }
};

export default handler;
