import React from 'react';
import "./Participants.css";
import { useMeetingContext } from '../../context/MeetingContext';

const Participants = () => {
    const { participants } = useMeetingContext();
    return (
        <div className="participants">
            <h3>Participants</h3>
            <div className="participants-list">
                {participants.map((participant, index) => (
                    <div key={index} className="participant-item">
                        <div className="participant-info">
                            <h4>{participant.name}</h4>
                            <h4>{participant.email}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Participants;