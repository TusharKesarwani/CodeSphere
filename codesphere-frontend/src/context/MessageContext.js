import React, { createContext, useState, useEffect, useContext } from "react";
import socket from "../socket";
import { useMeetingContext } from "./MeetingContext";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { meetingId, name } = useMeetingContext();

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, [setMessages]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { meetingId, sender: name, text: message });
            setMessage("");
        }
    };

    return (
        <MessageContext.Provider value={{ messages, setMessages, message, setMessage, sendMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }
    return context;
}