import React, { useState } from 'react'

import Editor from "@monaco-editor/react";


const CodeEditorWindow = ({ onChange, language, code, theme, isFullScreen, Fontoptions }) => {


    const [value, setValue] = useState(code || "")

    React.useEffect(() => {
        setValue(code)
    }, [code])
    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };
    return (
        <div className="overlay mt-1 overflow-hidden w-full h-full shadow-4xl"


        >
            <Editor
                options={Fontoptions}
                height={"100%"}
                width={`100%`}
                language={language || "javascript"}
                value={value}
                theme={theme}
                autoIndent={true}
                onChange={handleEditorChange}
            />
        </div>
    )
}

export default CodeEditorWindow