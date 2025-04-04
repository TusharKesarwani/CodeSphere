import React from "react";
import "./ResultView.css";
import { useCodeContext } from "../../context/CodeContext";

const ResultView = () => {
    const { output, runCode } = useCodeContext();

    return (
        <div className="result-view">
            <h2>Output</h2>
            <button onClick={runCode} className="run-code-button">Run Code</button>
            <pre className="output-container">{output}</pre>
        </div>
    );
};

export default ResultView;
