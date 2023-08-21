import moment from "moment";
import ChatSession from "../../lib/mongo/chat-session"

export const getChatSession = async (participants: string[]) => {
    console.log("participants", participants);
    const pMap = participants?.map(p => ({emailId: p}))
    const session = await ChatSession.find({ participants: { $all: pMap } });
    console.log("session:::", session);
    if (session == null || session.length === 0) {
        const chatSession = new ChatSession();
        chatSession.chatIdentifer = `CHAT_${moment().format("YYYYMMDDHHmmss")}`;
        chatSession.participants = [...pMap];
        chatSession.messages = [];
        return await chatSession.save();
    }
    return session[0];
}

export const sendMessage = async (chatIdentifer: string, message: any) => {
    // console.log("message", message);
    // const savedEntityList: any = await ChatSession.find({ chatIdentifer });
    // if (savedEntityList?.length > 0) {
    //     const chat = savedEntityList[0];
    //     if (chat?.messages == null) {
    //         chat.messages = [];
    //     }
    //     chat.messages.push(message);
    //     return await chat.save();
    // }
    return await ChatSession.findOneAndUpdate({chatIdentifer}, {"$push": {
        "$.messages": JSON.parse(message)
    }})
}