import React from 'react';
import "./Participants.css";
import { useMeetingContext } from '../../context/MeetingContext';

const Participants = () => {
    const { participants } = useMeetingContext();
    return (
        <div className="participants">
            <h1>Participants</h1>
            <div className="participants-list">
                {participants.map((participant, index) => (
                    <div key={index} className="participant-item">
                        <div className="participant-info">
                            <h2>{participant.name}</h2>
                            <h2>{participant.email}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Participants;