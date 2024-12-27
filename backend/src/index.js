import express from "express";

// importing .env file
import dotenv from "dotenv";

// importing routes for authorization
import authRoutes from "./routes/auth.route.js";
import { connectDb } from "./lib/db.js";

// using environment variable
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDb();
});
