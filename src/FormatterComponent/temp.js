


import React, { useState } from "react";
import "./App.css";
import jsonlint from "jsonlint-mod";
import yaml from "js-yaml";
import xmljs from "xml-js";

import CodeEditorWindow from "../components/CodeEditorWindow";
const options = {
    minimap: {
        enabled: false
    }
};

function App() {
    const [inputJsonData, setInputJsonData] = useState("");
    const [outputJsonData, setOutputJsonData] = useState("");
    const [processing, setProcessing] = useState(false);
    const [syntaxError, setSyntaxError] = useState(null);
    const [error, setError] = useState(false)
    const [lang, setLang] = useState('json')
    const handleInputChange = (action, data) => {

        switch (action) {
            case "code": {
                // handleValidate(data)
                try {
                    setInputJsonData(JSON.stringify(JSON.parse(data)));

                }
                catch (err) {
                    console.log(err)
                }
                break;
            }

            default: {
                setError(true)
                console.warn("case not handled!", action, data);
            }
        }


    };

    const handleFormatClick = () => {
        try {
            console.log(inputJsonData)
            const formattedJson = JSON.stringify(JSON.parse(inputJsonData), null, 2);
            handleValidate(formattedJson)
            setOutputJsonData(formattedJson);

        } catch (error) {
            setOutputJsonData("Invalid JSON");
        }
    };


    const handleValidate = () => {
        try {
            jsonlint.parse(inputJsonData);
            setSyntaxError(null);
            setError(false)
        } catch (e) {
            console.log("error", e.message)
            setSyntaxError(e.message);
            setError(true)
        }

    };

    const handleConvertToYaml = () => {
        const json = JSON.parse(inputJsonData);
        const yamlData = yaml.dump(json);
        setOutputJsonData(yamlData);
        setLang('yml')
    };

    const handleConvertToXml = () => {
        const json = JSON.parse(inputJsonData);
        const xmlData = xmljs.js2xml(json, { compact: true, spaces: 4 });
        setOutputJsonData(xmlData);
        setLang('xml')
    };

    function parseCSV(data) {
        const results = [];
        const headers = Object.keys(data);
        console.log(headers)
        results.push(headers.join(','));
        const values = headers.map((header) => {
            return data[header];
        });
        results.push(values.join(','));
        return results.join('\n');
    }

    function convertToCSV() {
        setOutputJsonData(parseCSV(inputJsonData));
    }

    return (
        <div className="App">
            <div className="Actionbtn">
                <button className="format-button" onClick={handleFormatClick}>
                    Format
                </button>


                <button disabled={error} className="format-button" onClick={handleValidate}>Validate</button>
                <button disabled={error} className="format-button" onClick={convertToCSV}>Convert to CSV</button>
                <button disabled={error} className="format-button" onClick={handleConvertToYaml}>Convert to YAML</button>
                <button disabled={error} className="format-button" onClick={handleConvertToXml}>Convert to XML</button>

                <h4> {processing ? "processing " : "not processing"} </h4>
            </div>
            <div className="pannelWrapper">
                <div className="inputpanel">
                    <CodeEditorWindow
                        className="inputbox"
                        code={inputJsonData}
                        options={options}
                        language="json"
                        onChange={handleInputChange}
                    />


                </div>


                <div className="outputpanel">

                    {syntaxError ? (
                        <div className="DisplayActionmsg">
                            <h2>Validation Errors:</h2>

                            {syntaxError}
                        </div>
                    ) :
                        <>
                            <CodeEditorWindow options={options} language={lang} className="outputbox" code={outputJsonData} ></CodeEditorWindow>

                            {/* <textarea className="outputbox" value={output} readOnly /> */}
                        </>
                    }


                </div>
            </div>
        </div>
    );
}

export default App;
