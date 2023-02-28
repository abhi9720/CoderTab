


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

import jsonpath from 'jsonpath';
import { FaDollarSign } from "react-icons/fa";


const options = {
  minimap: {
    enabled: false
  }
};


const fileTypes = ["json"];

function App() {
  const [inputJsonData, setInputJsonData] = useState("");
  const [outputJsonData, setOutputJsonData] = useState("");
  // const [processing, setProcessing] = useState(false);
  const [syntaxError, setSyntaxError] = useState(null);
  const [error, setError] = useState(false)
  const [lang, setLang] = useState('')




  /* Json query Hanlder :***************************************/

  const [query, setQuery] = useState('');
  const [queryoutput, setQueryOutput] = useState('')


  function handleKeyDown(e) {
    e.preventDefault();
    getValueFrompath();

  }

  function isValidQueryPath(obj, path) {
    const keys = path.split('.');
    let currentObj = obj;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!currentObj.hasOwnProperty(key)) {
        return false;
      }
      currentObj = currentObj[key];
    }

    return true;
  }

  function getValueFrompath() {
    if (inputJsonData && query) {
      const data = JSON.parse(inputJsonData);
      if (typeof data === "object") {
        try {
          if (!isValidQueryPath(data, query)) {
            console.log("invalid json")
            // eslint-disable-next-line
            throw "Invalid Json Query";
          }
          const result = jsonpath.query(data, query);

          setQueryOutput(JSON.stringify(result[0], null, 2) || "Invalid Json Query Path");

          setError(false)
          setSyntaxError('')
          setLang('')
        }
        catch (err) {
          setError(true)
          // eslint-disable-next-line
          setSyntaxError(new String(err))
        }
      }
    }


  }




  /************************************************************ */

  const handleInputChange = (action, data) => {

    switch (action) {
      case "code": {
        try {
          setInputJsonData(JSON.parse(JSON.stringify(data)));
        }
        catch (err) {
          console.log(err)
        }
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleFormatClick = () => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(inputJsonData), null, 2);
      setOutputJsonData(formattedJson);
      setLang("json")
      setError(false)
      setSyntaxError('');
    } catch (err) {
      console.log(err.SyntaxError)
      setError(true);
      setSyntaxError("Invalid JSON Syntax")
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

    setLang("csv");
    const rows = [];
    let parseddata = JSON.parse(data)
    console.log(typeof parseddata)
    const headers = Object.keys(parseddata);
    rows.push(headers);
    const row = [];
    headers.forEach(key => {
      row.push(parseddata[key]);
    });
    rows.push(row);
    const csv = rows.map(row => row.join(',')).join('\n');

    return csv;

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

      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" className="redirecthome">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-5">
              <FaHome fontSize={18} color="black" />
            </button>
          </Link>
          <img src="https://user-images.githubusercontent.com/68281476/221413170-43e808c4-48a4-457f-b61d-0b0dcd434ced.png" className="h-6 mr-3 sm:h-9" alt="jsonlogo Logo" />


          <span className="font-semibold text-xl tracking-tight">JSON Validator
          </span>
        </div>





        <div className="fileuploader">
          <FileUploader handleChange={readFileJson} name="file" types={fileTypes} />
        </div>


        <button onClick={copyToClipboard} type="button" className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <div>
            <FaRegCopy fontSize={18} color="black" /> Copy Output
          </div>
        </button>


        <form onSubmit={handleKeyDown}>
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none font-bold bg-teal-400">
              <FaDollarSign></FaDollarSign>.
            </div>
            <input autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} type="search" id="search" class="block p-4 pl-10 text-sm text-gray-900 border border-teal-300 rounded-lg bg-teal-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-teal-700 dark:border-teal-600 dark:placeholder-teal-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 focus:outline-none docus jsonqueryinput" placeholder="Json Query Path" required />
            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 ">Search</button>
          </div>
        </form>





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

          {
            outputJsonData && lang &&
            <div className="bg-blue-100 text-blue-800  font-bold text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 flex justify-center items-center gap-2">
              <span>Json</span>  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  <span className="capitalize">{lang}</span>
            </div>


          }

          <button className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={handleFormatClick}>
            Format / Json
          </button>


          {
            lang === "json" &&
            <button disabled={error} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={handleValidate}>Validate Json</button>
          }
          <button disabled={error} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={convertToCSV}>Convert to CSV</button>

          <button disabled={error} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={handleConvertToYaml}>Convert to YAML</button>
          <button disabled={error} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={handleConvertToXml}>{`Convert \n to XML`}</button>

        </div>

        <div className="outputpanel">

          {error ? (
            <div className="DisplayActionmsg">
              <h2 className="text-red-400 font-bold py-2 px-5">Error</h2>
              <hr />
              <pre>
                {syntaxError}
              </pre>
            </div>
          ) :
            <>
              {
                !lang ?
                  <div className="DisplayActionmsg">
                    <pre>
                      {queryoutput}
                    </pre>
                  </div>
                  : <>
                    <CodeEditorWindow options={options} language={lang} className="outputbox" code={outputJsonData} ></CodeEditorWindow>
                  </>
              }
            </>
          }


        </div>
      </div>
    </div>
  );
}

export default App;
