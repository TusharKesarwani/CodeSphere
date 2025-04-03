import React, { useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { Editor } from "@uiw/react-codemirror";

const CodeEditor = ({ code, setCode }) => {
  return (
    <div className="code-editor">
      <h2>Code Editor</h2>
      {/* <Editor
                value={code}
                extensions={[javascript(), basicSetup]}
                onChange={(val) => setCode(val)}
            /> */}
    </div>
  );
};

export default CodeEditor;
