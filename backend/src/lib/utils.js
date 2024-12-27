import jwt from "jsonwebtoken";

// function for creating jwt token
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // set in cookies
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Milli Second
    httpOnly: true, //prevent from xss attack
    sameSite: "Strict", // cross-site request forgery attack
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
