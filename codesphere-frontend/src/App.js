import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { MeetingProvider } from "./context/MeetingContext";
import { MessageProvider } from "./context/MessageContext";
import { CodeProvider } from "./context/CodeContext";

function App() {

    return (
        <MeetingProvider>
            <MessageProvider>
                <CodeProvider>
                    <LandingPage />
                </CodeProvider>
            </MessageProvider>
        </MeetingProvider>
    );
}

export default App;
