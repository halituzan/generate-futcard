import { verify } from "jsonwebtoken";

const verifyUser = (token: string) => {
  const verifiedToken = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
  if (typeof verifiedToken === "string") {
    console.error("Verification failed:", verifiedToken);
    return false;
  }
  const { userId } = verifiedToken;
  if (!userId) {
    return false;
  }
  return userId;
};

export default verifyUser;
