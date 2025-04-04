import React, { useState } from "react";
import "./ResultView.css";

const ResultView = ({ code }) => {
    const [output, setOutput] = useState("");

    const runCode = () => {
        try {
            const result = eval(code);
            setOutput(result !== undefined ? result.toString() : "No output");
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className="result-view">
            <h2>Output</h2>
            <button onClick={runCode} className="run-code-button">Run Code</button>
            <pre className="output-container">{output}</pre>
        </div>
    );
};

export default ResultView;
