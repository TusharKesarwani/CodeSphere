import React from "react";
import "./CodeEditor.css";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';


const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="code-editor">
      <div className="code-editor-title">Code Editor</div>
      <CodeMirror value={code} height="200px" extensions={[javascript({ jsx: true })]} onChange={(val) => setCode(val)} className="code-mirror-wrapper" theme={okaidia} />
    </div>
  );
};

export default CodeEditor;
