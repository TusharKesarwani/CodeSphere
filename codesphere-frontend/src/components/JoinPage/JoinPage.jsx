import React from "react";
import "./JoinPage.css";
import { useMeetingContext } from "../../context/MeetingContext";

const JoinPage = () => {
    const { meetingId, setMeetingId, name, setName, error, createMeeting, joinMeeting } = useMeetingContext();

    return (
        <div>
            <div className="join-meeting-container">
                <h2 className="join-meeting-title">Join a Meeting</h2>
                <div className="join-meeting-inputs">
                    <input className="meeting-id-input" type="text" placeholder="Meeting ID" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
                    <input className="name-input" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="join-button-container">
                        <button className="join-button" onClick={joinMeeting}>Join Meeting</button>
                        <button className="create-button" onClick={createMeeting}>Create Meeting</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default JoinPage;
