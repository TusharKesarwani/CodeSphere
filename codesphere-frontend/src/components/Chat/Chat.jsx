import React from "react";
import MessageContainer from "./MessageContainer/MessageContainer";
import { useMessageContext } from "../../context/MessageContext";
import "./Chat.css";

const Chat = ({ meetingId, name }) => {
    const { message, setMessage, sendMessage } = useMessageContext();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (message.trim()) sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-container-title">Group Chat</div>
            <MessageContainer />
            <div className="chat-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage} className="send-message">Send</button>
            </div>
        </div>
    );
};

export default Chat;
