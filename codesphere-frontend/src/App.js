import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { MeetingProvider } from "./context/MeetingContext";
import { MessageProvider } from "./context/MessageContext";

function App() {

    return (
        <MeetingProvider>
            <MessageProvider>
                <LandingPage />
            </MessageProvider>
        </MeetingProvider>
    );
}

export default App;
