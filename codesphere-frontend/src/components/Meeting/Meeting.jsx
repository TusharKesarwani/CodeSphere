import React, { useState, useEffect } from "react";
import "./Meeting.css";
import socket from "../../socket";
import Chat from "../Chat/Chat";
import CodeEditor from "../CodeEditor/CodeEditor";
import ResultView from "../ResultView/ResultView";
import { useMeetingContext } from "../../context/MeetingContext";

const Meeting = () => {
  const { meetingId, name } = useMeetingContext();
  const [code, setCode] = useState("// Write JavaScript here...");

  useEffect(() => {
    socket.emit("joinMeeting", { meetingId, name });
  }, [meetingId, name]);

  return (
    <div className="meeting-container">
      <div className="chat-section">
        <Chat meetingId={meetingId} name={name} />
      </div>
      <div className="coding-section">
        <CodeEditor code={code} setCode={setCode} />
        <ResultView code={code} />
      </div>
    </div>
  );
};

export default Meeting;
