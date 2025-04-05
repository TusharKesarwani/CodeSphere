import React from "react";
import { useMessageContext } from "../../../context/MessageContext";
import "./MessageContainer.css";

const MessageContainer = () => {
    const { messages } = useMessageContext();
    return (
        <div className="message-container">
            {messages.map((msg, index) => (
                <div key={index} className={`message  ${msg.type}`}>
                    <strong>{msg.type === "message" ? `${msg.sender} :` : ""}</strong> {msg.text}
                </div>
            ))}
        </div>
    );
};

export default MessageContainer;