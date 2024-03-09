import jwt, { verify } from "jsonwebtoken";
const verifyUser = (token) => {
    const { userId } = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    if (!userId) {
        return false
    }

    return userId
}

export default verifyUser