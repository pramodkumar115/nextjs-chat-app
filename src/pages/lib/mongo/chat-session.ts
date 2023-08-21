import mongoose from "mongoose";

const ChatSessionSchema = new mongoose.Schema({
    chatIdentifer: { type: String, unique: true, required: true },
    participants: { type: Array<{emailId: String}>, unique: false, required: true },
    messages: [{
            author: String,
            messageBody: String,
            timeStamp: Date
    }]
});

const ChatSessionModel = mongoose.models.ChatSession ||
    mongoose.model("ChatSession", ChatSessionSchema, "ChatSession");

export default ChatSessionModel;