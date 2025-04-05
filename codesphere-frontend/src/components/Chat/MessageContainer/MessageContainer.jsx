import React, { useEffect, useRef } from "react";
import { useMessageContext } from "../../../context/MessageContext";
import "./MessageContainer.css";

const MessageContainer = () => {
    const { messages } = useMessageContext();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="message-container">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                    <strong>{msg.type === "message" ? `${msg.sender} :` : ""}</strong> {msg.text}
                </div>
            ))}
            <div ref={messagesEndRef} className="message-end-ref" />
        </div>
    );
};

export default MessageContainer;