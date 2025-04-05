import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import socket from "../socket";
import { v4 as uuidv4 } from 'uuid';

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
    const [myUUID] = useState(uuidv4());
    const [email, setEmail] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [name, setName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [error, setError] = useState("");
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const joinMeeting = async (setMessages) => {
        if (!meetingId.trim() || !name.trim() || !email.trim() || !email.includes("@")) {
            if (!meetingId.trim()) {
                setError("Please enter a valid Meeting ID.");
            } else if (!name.trim()) {
                setError("Please enter a valid Name.");
            } else if (!email.trim() || !email.includes("@")) {
                setError("Please enter a valid Email.");
            }
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/meetings/${meetingId}`, {
                myUUID,
                email,
                name,
                socketId: localStorage.getItem("socketId"),
            }, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response?.data);

            if (response?.status === 200 && response?.data) {
                setIsJoined(true);
                setParticipants(response?.data?.participants || []);
                setMessages(response?.data?.messages || []);
                setError("");
            } else if (response?.data?.error) {
                setError(response?.data?.error);
            } else {
                setError("Meeting ID not found.");
            }
        } catch (error) {
            setError("Error connecting to server.");
        }
    };

    const createMeeting = async () => {
        if (!name.trim() || !email.trim() || !email.includes("@")) {
            if (!name.trim()) {
                setError("Please enter a valid Name.");
            } else if (!email.trim() || !email.includes("@")) {
                setError("Please enter a valid Email.");
            }
            return;
        }

        try {
            const response = await axios.post(BACKEND_URL + "/api/meetings/create", {
                myUUID,
                email,
                name,
                socketId: localStorage.getItem("socketId"),
            }, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response?.data);

            if (response?.status === 200 && response?.data) {
                setIsJoined(true);
                setMeetingId(response?.data?.meetingId);
                setParticipants(response?.data?.participants || []);
                setError("");
            } else if (response?.data?.error) {
                setError(response?.data?.error);
            } else {
                setError("Error creating meeting.");
            }
        } catch (error) {
            setError("Error creating meeting.");
        }
    }

    useEffect(() => {
        const handleDisconnect = () => {
            console.warn("Socket disconnected");
            setIsJoined(false);
            localStorage.removeItem("socketId");
            setError("Socket disconnected. Please refresh the page.");
        };

        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("disconnect", handleDisconnect);
        };
    }, []);

    return (
        <MeetingContext.Provider value={{ myUUID, email, setEmail, meetingId, setMeetingId, name, setName, participants, setParticipants, isJoined, setIsJoined, error, setError, createMeeting, joinMeeting }}>
            {children}
        </MeetingContext.Provider>
    );
};

export const useMeetingContext = () => {
    const context = useContext(MeetingContext);
    if (!context) {
        throw new Error("useMeetingContext must be used within a MeetingProvider");
    }
    return context;
}