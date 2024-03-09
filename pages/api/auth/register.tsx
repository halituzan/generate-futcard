import User from "@/helpers/dbModels/userModel";
import connectDB from "@/helpers/dbConnect";
import bcrypt from "bcryptjs";

connectDB();

const handler = async (req: any, res: any) => {
  const { firstName, lastName, email, password, userName } = req.body;
  console.log(req.body);

  if (!firstName || !lastName || !email || !password || !userName) {
    res.json({
      message: "Lütfen gerekli alanları doldurun!",
      status: false,
    });
  }

  try {
    // Check if user already exists

    const user = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (user?.email === email)
      res.json({
        message: "Bu Email İle Kullanıcı Mevcut",
        status: false,
      });

    if (user?.phone === phone)
      res.json({
        message: "Bu Telefon Numarası İle Kullanıcı Mevcut",
        status: false,
      });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();

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
