import React, { createContext, useState, useContext, useEffect } from "react";
import socket from "../socket";
import { useMeetingContext } from "./MeetingContext";

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
    const [code, setCode] = useState("// Write JavaScript here...");
    const { meetingId, name, email } = useMeetingContext();
    const [output, setOutput] = useState("");

    useEffect(() => {
        socket.on("receiveCode", (newCode, output) => {
            setCode(newCode);
            setOutput(output);
        });

        return () => {
            socket.off("receiveCode");
        }
    }, [setCode]);

    const runCode = () => {
        try {
            const result = eval(code);
            setOutput(result !== undefined ? result.toString() : "No output");
            if (code && code.trim() !== "// Write JavaScript here..." && code.trim() !== "" && result !== undefined) {
                socket.emit("sendCode", { meetingId, sender: name, senderEmail: email, newCode: code, output: result });
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <CodeContext.Provider value={{ code, setCode, runCode, output, setOutput }}>
            {children}
        </CodeContext.Provider>
    );
};

export const useCodeContext = () => {
    const context = useContext(CodeContext);
    if (!context) {
        throw new Error("useCodeContext must be used within a CodeProvider");
    }
    return context;
}