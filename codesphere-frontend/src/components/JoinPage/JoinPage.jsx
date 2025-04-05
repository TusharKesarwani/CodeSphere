import React, { useState } from "react";
import "./JoinPage.css";
import { useMeetingContext } from "../../context/MeetingContext";

const JoinPage = () => {
    const { email, setEmail, meetingId, setMeetingId, name, setName, error, createMeeting, joinMeeting } = useMeetingContext();
    const [haveMeetingId, setHaveMeetingId] = useState(false);

    return (
        <div>
            <div className="join-meeting-container">
                <h2 className="join-meeting-title">{haveMeetingId ? "Join" : "Create"} a Meeting</h2>
                <div className="join-meeting-form">
                    <div className="join-meeting-inputs">
                        {
                            haveMeetingId ? (
                                <input className="meeting-id-input" type="text" placeholder="Meeting ID" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} />
                            ) : null
                        }
                        <input className="email-input" type="email" placeholder="Your Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="name-input" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="toggle-link">
                        {
                            haveMeetingId ? (
                                <span>
                                    Don't have a meeting Id ? <span className="join-link" onClick={() => setHaveMeetingId(false)}>Create</span>
                                </span>
                            ) : (
                                <span>
                                    Already have a meeting Id ? <span className="join-link" onClick={() => setHaveMeetingId(true)}>Join</span>
                                </span>
                            )
                        }
                    </div>
                    <div className="join-button-container">
                        {
                            haveMeetingId ? (
                                <button className="join-button" onClick={joinMeeting}>Join Meeting</button>
                            ) : (
                                <button className="create-button" onClick={createMeeting}>Create Meeting</button>
                            )
                        }
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default JoinPage;
