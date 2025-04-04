import React from "react";
import "./LandingPage.css";
import Meeting from "../Meeting/Meeting";
import JoinPage from "../JoinPage/JoinPage";
import { useMeetingContext } from "../../context/MeetingContext";

const LandingPage = () => {
    const { isJoined } = useMeetingContext();

    return (
        <div className="landing-page-container">
            {!isJoined ? (
                <JoinPage />
            ) : (
                <Meeting />
            )}
        </div>
    );
}

export default LandingPage;
