import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("error in getUserForSideBar controller: ", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    let { id: userToChatId } = req.params;
    let myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages controller: ", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // real time chat func using socket.io

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller: ", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};
