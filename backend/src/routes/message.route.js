import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUserForSideBar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// get all the user in sidebar
router.get("/getUsers", protectRoute, getUserForSideBar);

// get all the messages bw 2 users
router.get("/:id", protectRoute, getMessages);

// send message to user
router.post("/send/:id", protectRoute, sendMessage);
export default router;
