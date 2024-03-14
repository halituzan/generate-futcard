import connectDB from "@/helpers/dbConnect";
import cookie from "cookie";

connectDB();

const handler = async (req: any, res: any) => {
  try {
    // Silinmesi gereken JWT token'ını cookie'den al
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0), // Token'ı geçmiş bir tarihe ayarla
        path: "/", // Cookie'nin geçerli olduğu yolu ayarla
      })
    );

    res.status(200).json({
      message: "User Logout Successfully",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong.", status: false });
  }
};

export default handler;
