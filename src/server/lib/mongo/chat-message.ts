import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
    chatIdentifier: String,
    sender: String,
    timeStamp: String,
    message: String
})