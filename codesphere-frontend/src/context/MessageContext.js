import React, { createContext, useState, useEffect, useContext } from "react";
import socket from "../socket";
import { useMeetingContext } from "./MeetingContext";
import axios from "axios";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { meetingId, name, setParticipants } = useMeetingContext();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, { sender: msg.sender, text: msg.text, type: "message" }]);
        });

        return () => {
            socket.off("receiveMessage");
        }
    }, [setMessages]);

    useEffect(() => {
        socket.on("newParticipant", (participant) => {
            if (participant?.id === socket.id) return;
            setMessages((prev) => [...prev, { sender: "System", text: `${participant.name} joined the meeting`, type: "notification" }]);
            axios.get(`${BACKEND_URL}/api/meetings/${meetingId}/participants`)
                .then((response) => {
                    if (response.status === 200) {
                        setParticipants(response.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching participants:", error);
                });
        });

        socket.on("participantDisconnected", (socketId, removedParticipant) => {
            setMessages((prev) => [...prev, { sender: "System", text: `${removedParticipant} left the meeting`, type: "notification" }]);
            setParticipants((prev) => prev.filter((participant) => participant.socketId !== socketId));
        });

        return () => {
            socket.off("newParticipant");
            socket.off("participantDisconnected");
        }
    }, [setParticipants, meetingId, BACKEND_URL]);

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
                await axios.post(`${BACKEND_URL}/api/messages/save`, msgObj);
            } catch (err) {
                console.error("Failed to save message:", err.message);
            }
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