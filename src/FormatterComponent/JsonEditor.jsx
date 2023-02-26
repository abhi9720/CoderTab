


import React, { useState } from "react";
import "./App.css";
import jsonlint from "jsonlint-mod";
import yaml from "js-yaml";
import xmljs from "xml-js";
import { FaHome, FaRegCopy } from 'react-icons/fa';
import CodeEditorWindow from "../components/CodeEditorWindow";
import { showErrorToast, showSuccessToast } from "../utils/notification";
import copy from "copy-to-clipboard";
import { FileUploader } from "react-drag-drop-files";
import { Link } from "react-router-dom";

const options = {
  minimap: {
    enabled: false
  }
};


const fileTypes = ["json"];

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
        try {
          setInputJsonData(data);
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
      const formattedJson = JSON.stringify(JSON.parse(inputJsonData), null, 2);
      setOutputJsonData(formattedJson);

      setLang("json")

    } catch (error) {
      setOutputJsonData("Invalid JSON Syntax");
      showErrorToast("Invalid JSON Syntax");
    }
  };


  const handleValidate = () => {
    try {
      jsonlint.parse(inputJsonData);
      setSyntaxError(null);
      setError(false)
      showSuccessToast("Json Valid", 2000)

      setLang("json")
    } catch (e) {
      console.log("error", e.message)
      setSyntaxError(e.message);
      setError(true);
      showSuccessToast("Json Invalid", 2000)

    }
  };

  const handleConvertToYaml = () => {
    const json = JSON.parse(inputJsonData);
    const yamlData = yaml.dump(json);
    setOutputJsonData(yamlData);
    setLang('yaml')

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

    setLang("csv");
    results.push(values.join(','));
    return results.join('\n');
  }

  function convertToCSV() {
    setOutputJsonData(parseCSV(inputJsonData));
  }


  const copyToClipboard = () => {
    copy(outputJsonData);
    showSuccessToast('Copied')
  }


  const readFileJson = (file) => {


    console.log(file)
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        setError(null);
        handleInputChange("code", reader.result)
      } catch (e) {
        setError('Invalid JSON syntax!');
      }
    };
    reader.readAsText(file);
  };




  return (
    <div className="App">

      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-5">
              <FaHome fontSize={18} color="black" />
            </button>
          </Link>
          <img src="https://user-images.githubusercontent.com/68281476/221413170-43e808c4-48a4-457f-b61d-0b0dcd434ced.png" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />


          <span class="font-semibold text-xl tracking-tight">JSON Validator
          </span>
        </div>


        <div className="fileuploader">
          <FileUploader handleChange={readFileJson} name="file" types={fileTypes} />
        </div>


        <button onClick={copyToClipboard} type="button" id="copytxt" className="format-button iconbtn">
          <div>
            <FaRegCopy fontSize={18} color="white" /> Copy Output
          </div>
        </button>

      </nav>
      <div className="pannelWrapper">


        <div className="inputpanel">
          <CodeEditorWindow
            className="inputbox"
            code={inputJsonData}
            options={options}
            language="json"
            theme="vs.cobalt"
            onChange={handleInputChange}
          />



        </div>

        <div className="Actionbtn">
          <button className="format-button" onClick={handleFormatClick}>
            Format / Json
          </button>


          {
            lang === "json" &&
            <button disabled={error} className="format-button" onClick={handleValidate}>Validate Json</button>
          }
          <button disabled={error} className="format-button" onClick={convertToCSV}>Convert to CSV</button>

          <button disabled={error} className="format-button" onClick={handleConvertToYaml}>Convert to YAML</button>
          <button disabled={error} className="format-button" onClick={handleConvertToXml}>{`Convert \n to XML`}</button>

          <h4> {processing ? "processing " : "not processing"} </h4>



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
