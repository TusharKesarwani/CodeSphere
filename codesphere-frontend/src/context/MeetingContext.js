import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import socket from "../socket";

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [name, setName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [error, setError] = useState("");
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const joinMeeting = async () => {
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
                email,
                name,
                socketId: localStorage.getItem("socketId"),
            }, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);

            if (response.status === 200 && response.data) {
                setIsJoined(true);
                setParticipants(response.data.participants || []);
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
                email,
                name,
                socketId: localStorage.getItem("socketId"),
            }, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.data);
            if (response.data.error) {
                setError(response.data.error);
                return;
            }

            setMeetingId(response.data.meetingId);
            setIsJoined(true);
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

            if (meetingId && name) {
                axios.put(`${BACKEND_URL}/api/meetings/${meetingId}/update-socket`, {
                    email,
                    name,
                    newSocketId: null,
                });
            }
        };

        const handleConnect = () => {
            console.log("Socket connected:", socket.id);
            localStorage.setItem("socketId", socket.id);
            setError("");

            if (meetingId && name) {
                axios.put(`${BACKEND_URL}/api/meetings/${meetingId}/update-socket`, {
                    email,
                    name,
                    newSocketId: socket.id,
                });
            }
        };

        socket.on("disconnect", handleDisconnect);
        socket.on("connect", handleConnect);

        return () => {
            socket.off("disconnect", handleDisconnect);
            socket.off("connect", handleConnect);
        };
    }, [meetingId, name, email, BACKEND_URL]);

    return (
        <MeetingContext.Provider value={{ email, setEmail, meetingId, setMeetingId, name, setName, participants, setParticipants, isJoined, setIsJoined, error, setError, createMeeting, joinMeeting }}>
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