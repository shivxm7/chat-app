import express from "express";

// importing .env file
import dotenv from "dotenv";

// importing routes for authorization
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";

// used for decoding jwt token
import cookieParser from "cookie-parser";

// used for reciving request from frontend on different port
import cors from "cors";
import { app, server } from "./lib/socket.js";

// using environment variable
dotenv.config();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDb();
});
