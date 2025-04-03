import React from "react";
import MessageContainer from "./MessageContainer/MessageContainer";
import { useMessageContext } from "../../context/MessageContext";
import "./Chat.css";

const Chat = ({ meetingId, name }) => {
    const { message, setMessage, sendMessage } = useMessageContext();

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            <MessageContainer />
            {/* <div>{messages.map((msg, index) => (<p key={index}><b>{msg.sender}:</b> {msg.text}</p>))}</div> */}
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
