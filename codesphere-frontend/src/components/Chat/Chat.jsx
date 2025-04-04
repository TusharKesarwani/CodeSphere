import React from "react";
import "./Chat.css";
import MessageContainer from "./MessageContainer/MessageContainer";
import { useMessageContext } from "../../context/MessageContext";
import { useMeetingContext } from "../../context/MeetingContext";

const Chat = () => {
    const { meetingId, participants } = useMeetingContext();
    const { message, setMessage, sendMessage } = useMessageContext();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (message.trim()) sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-title">Group Chat</div>
                <div className="chat-info">
                    <div className="meeting-id">Meeting Id: {meetingId}</div>
                    <div className="chat-participants">{participants.length} people joined</div>
                </div>
            </div>
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
