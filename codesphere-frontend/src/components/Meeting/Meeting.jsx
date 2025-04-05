import React, { useEffect } from "react";
import "./Meeting.css";
import socket from "../../socket";
import Chat from "../Chat/Chat";
import CodeEditor from "../CodeEditor/CodeEditor";
import ResultView from "../ResultView/ResultView";
import { useMeetingContext } from "../../context/MeetingContext";

const Meeting = () => {
  const { meetingId, name } = useMeetingContext();

  useEffect(() => {
    socket.emit("joinMeeting", { meetingId, name });
  }, [meetingId, name]);

  return (
    <div className="meeting-container">
      <div className="chat-section">
        <Chat />
      </div>
      <div className="coding-section">
        <CodeEditor />
        <ResultView />
      </div>
    </div>
  );
};

export default Meeting;
