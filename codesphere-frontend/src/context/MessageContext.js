import React, { createContext, useState, useEffect, useContext } from "react";
import socket from "../socket";
import { useMeetingContext } from "./MeetingContext";
import axios from "axios";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { meetingId, name } = useMeetingContext();

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, { sender: msg.sender, text: msg.text, type: "message" }]);
        });
        socket.on("newParticipant", (participant) => {
            setMessages((prev) => [...prev, { sender: "System", text: `${participant.name} joined the meeting`, type: "notification" }]);
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("newParticipant");
        }
    }, [setMessages]);

    const sendMessage = async () => {
        if (message.trim()) {
            const msgObj = {
                meetingId,
                sender: name,
                text: message,
                type: "message"
            };

            socket.emit("sendMessage", msgObj);
            setMessage("");

            try {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/messages/save`, msgObj);
            } catch (err) {
                console.error("Failed to save message:", err.message);
            }
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/messages/${meetingId}`);
            if (response.status === 200) {
                setMessages(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch messages:", err.message);
        }
    };

    return (
        <MessageContext.Provider value={{ messages, setMessages, message, setMessage, sendMessage, fetchMessages }}>
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