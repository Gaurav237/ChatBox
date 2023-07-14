const asyncHandler = require('express-async-handler');
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    try{
        var messageData = {
            sender: req.user._id, // the logged-in user
            content: content,
            chat: chatId
        };

        const newMessage = await Message.create(messageData)
        .populate("sender", "name pic")
        .populate("chat")
        .populate({
            path: "chat.users",
            select: "name email pic",
        });

        // update the latestMessage of the chat
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: newMessage
        });

        res.json(newMessage);

    } catch(err) {
        res.status(400);
        throw new Error(err.message);
    }
});

module.exports = {
    sendMessage,
}