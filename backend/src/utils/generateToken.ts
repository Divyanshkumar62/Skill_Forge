import jwt from "jsonwebtoken";

const generateToken = (userId: string ) : string => {
  return jwt.sign({userId}, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export default generateToken;
 