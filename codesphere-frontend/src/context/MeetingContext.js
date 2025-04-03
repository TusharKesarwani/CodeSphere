import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
    const [meetingId, setMeetingId] = useState("");
    const [name, setName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [error, setError] = useState("");
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const joinMeeting = async () => {
        if (!meetingId.trim() || !name.trim()) {
            setError("Please enter a valid Meeting ID and Name.");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/meetings/${meetingId}`, {
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
        if (!name.trim()) {
            setError("Please enter a valid Name.");
            return;
        }

        try {
            const response = await axios.post(BACKEND_URL + "/api/meetings/create", {
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

    return (
        <MeetingContext.Provider value={{ meetingId, setMeetingId, name, setName, participants, setParticipants, isJoined, setIsJoined, error, setError, createMeeting, joinMeeting }}>
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