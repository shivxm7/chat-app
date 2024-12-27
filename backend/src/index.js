import express from "express";

// importing .env file
import dotenv from "dotenv";

// importing routes for authorization
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";

// used for decoding jwt token
import cookieParser from "cookie-parser";
// using environment variable
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDb();
});
