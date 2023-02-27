import React, { useEffect, useState } from 'react'
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { languageOptions } from "../constants/languageOptions";
import { snippet } from "../constants/snippet";
import { classnames } from "../utils/general";
import './codeEditor.css'
import { FaExpand, FaCompress, FaRegCopy, FaHome } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../lib/defineTheme"
import LanguagesDropdown from './LanguageDropdown';
import ThemeDropdown from './ThemeDropdown';
import CustomInput from './CustomInput';
import OutputWindow from './OutputWindow';
import OutputDetails from './OutputDetails';
import useKeyPress from '../hooks/useKeyPress';
import DateDiff from 'date-diff';
import copy from 'copy-to-clipboard';
import StopWatch from './StopWatch';
import { Link } from 'react-router-dom';



//Compiler API  deploy on server:  https://github.com/Jaagrav/CodeX-API/tree/master/executeCode
//Realtime code update : https://github.com/RisingGeek/CodeEditor
const defaultCode = `// Type Your code here 1`;
const CodeEditor = () => {


    function loadTheme() {
        let th = { label: 'Blackboard', value: 'blackboard', key: 'blackboard' }
        if (localStorage.getItem("usertheme")) {
            console.log("update theme from local storage");
            th = JSON.parse(localStorage.getItem("usertheme"))
        }
        return th;

    }

    const [code, setCode] = useState(defaultCode);
    const [theme, setTheme] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [font_size, set_font_size] = useState(16)
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem("language")) || languageOptions[0]);
    const [offlineStatus, SetofflineStatus] = useState(false)



    function setOffline() {
        SetofflineStatus(true);
    }
    function setOnline() {
        SetofflineStatus(false)
    }
    // reset code 
    function ctrlplusr(e) {

        if (e.keyCode === 69 && e.ctrlKey) {

            e.preventDefault()
            resetCode()
        }
        else if (e.keyCode === 83 && e.ctrlKey) {
            e.preventDefault()
            downloadTxtFile()
        }
    }


    useEffect(() => {

        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
        window.addEventListener('keydown', ctrlplusr);
        return () => {
            window.removeEventListener("online", setOnline)
            window.removeEventListener("offline", setOffline)
            window.removeEventListener('keydown', ctrlplusr)
        }
    })




    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                window.localStorage.setItem(language.value, JSON.stringify(data))
                break;
            }

            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };



    useEffect(() => {
        const prevCode = JSON.parse(localStorage.getItem(language.value));
        setCode(prevCode || snippet(language.value));

    }, [language.value]);





    const ctrlPress = useKeyPress("Control");
    const key_run = useKeyPress("F9");
    const key_save = useKeyPress("q")
    const key_fullScreen = useKeyPress("F11");




    const onSelectChange = (sl) => {

        setLanguage(sl);
        setOutputDetails(null);
        localStorage.setItem("language", JSON.stringify(sl));
    };

    const downloadTxtFile = (data) => {
        const element = document.createElement("a");
        const file = new Blob([data], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);

        element.download = `${language.value}-code.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

    }

    // function ShareTextFile() {
    //     console.log(this);
    //     let element = document.createElement("a");

    //     element.href = "whatsapp://send?text=" + JSON.stringify(code);

    //     document.body.appendChild(element);

    //     element.click();



    // }

    useEffect(() => {
        if (key_run) {
            handleCompile();
        }
        // eslint-disable-next-line
    }, [ctrlPress, key_run]);

    useEffect(() => {
        if (ctrlPress && key_save) {

            downloadTxtFile(code)
        }
        // eslint-disable-next-line
    }, [ctrlPress, key_save, code]);




    async function handleThemeChange(th) {
        const theme = th;

        console.log(theme);
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {

            console.log("calling define theme ");
            defineTheme(theme.value)
                .then((_) => {

                    setTheme(theme);
                    localStorage.setItem("usertheme", JSON.stringify(theme));
                })
        }

    }

    const handleCompile = () => {
        if (processing) return
        console.log(code)
        setProcessing(true);
        // if (langMap[language.value]) {
        if (false) {
            // console.log("if part ");
            let lang = language.value
            if (lang === 'python') {
                lang = 'py'
            }
            // var qs = require('qs');
            var data = {
                code: code,
                language: lang,
                input: customInput,
            };



            var config = {
                method: "post",
                url: process.env.REACT_APP_BACKEND_URL,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };


            axios(config)
                .then(function (response) {


                    setProcessing(false)
                    var timeDiff = new DateDiff(new Date(), new Date(outputDetails?.timestamp));

                    response.data.time = (timeDiff.seconds() / 1000).toFixed(3).toString();


                    setOutputDetails(response.data)

                    //language: "java"
                    // output: "hello Abhishek\n"
                    // success: true
                    // timestamp: "2022-05-27T10:19:18.256Z"
                    // version: "11.0.15"
                    showSuccessToast(`Compiled Successfully!`)
                })
                .catch(function (error) {
                    if (offlineStatus) {
                        showErrorToast("Slow or no internet connection");
                    }
                    else {
                        showErrorToast()
                    }
                    setProcessing(false)
                    console.log(error);


                });
        }
        else {

            // console.log("else part ");

            const formData = {
                language_id: language.id,
                source_code: btoa(code),
                stdin: btoa(customInput),
            };

            console.log(process.env.REACT_APP_RAPID_API_HOST)

            const options = {
                method: "POST",
                url: process.env.REACT_APP_RAPID_API_URL,
                params: { base64_encoded: "true", fields: "*" },
                headers: {
                    "content-type": "application/json",
                    "Content-Type": "application/json",
                    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
                },
                data: formData,
            };

            axios
                .request(options)
                .then(function (response) {
                    // console.log("res.data", response.data);
                    const token = response.data.token;
                    checkStatus(token);
                })
                .catch((err) => {
                    let error = err.response ? err.response.data : err;
                    setProcessing(false);
                    console.dir(error);

                });

        }
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };


        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                /* So, if statusId ===1 OR statusId ===2 
                that means our code is still processing and 
                we need to call the API again to check 
                if we get any results or not.*/
                setTimeout(() => {
                    checkStatus(token)
                }, 2000)
                return
            } else {
                setProcessing(false)
                setOutputDetails(response.data)
                showSuccessToast(`Compiled Successfully!`)
                // console.log('response.data', response.data)
                return
            }
        } catch (err) {
            console.log("err", err);
            setProcessing(false);
            showErrorToast();
        }
    };


    const resetCode = () => {

        let text = "Your code will be discarded and reset to the default code!";
        if (window.confirm(text)) {
            setCode(snippet(language.value))
        }

    }


    // function launchFullscreen(element) {
    //     // console.log('called');
    //     if (element.requestFullscreen) {
    //         element.requestFullscreen();
    //     } else if (element.mozRequestFullScreen) {
    //         element.mozRequestFullScreen();
    //     } else if (element.webkitRequestFullscreen) {
    //         element.webkitRequestFullscreen();
    //     } else if (element.msRequestFullscreen) {
    //         element.msRequestFullscreen();
    //     }
    // }

    // function exitFullscreen() {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen();
    //     } else if (document.webkitExitFullscreen) {
    //         document.webkitExitFullscreen();
    //     }
    // }

    const makeFullScreen = async () => {
        if (!fullScreen) {
            // launchFullscreen(document.documentElement)
            setFullScreen(true)
        }
        else {
            // exitFullscreen();
            setFullScreen(false)
        }

    }


    useEffect(() => {
        if (key_fullScreen) {
            // console.log("f11 pressed")
            // makeFullScreen()
        }
        //eslint-disable-next-line
    }, [key_fullScreen]);


    // const url = window.location.pathname.split('/').pop();


    useEffect(() => {
        let th = loadTheme();
        console.log("calling define theme from useEffect")
        // defineTheme(th.value).then((_) =>
        //     setTheme(th)
        // );
        handleThemeChange(th);
    }, []);

    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showErrorToast = (msg) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    const handleShare = async () => {



        try {
            await navigator.share({
                files: [
                    new File([code], 'codetext.txt', { type: "text/plain", }),
                ],
                title: 'code',
                text: 'code',
            },
                {

                    copy: true,
                    email: true,
                    print: true,
                    sms: true,
                    messenger: true,
                    facebook: true,
                    whatsapp: true,
                    twitter: true,
                    linkedin: true,
                    telegram: true,
                    skype: true,
                    pinterest: true,
                    language: 'pt'
                }
            );

        } catch (err) {
            console.error(err);
        }
    };


    // =======================* Split view *=====================*****==============
    useEffect(() => {
        const resizer = document.getElementById('dragMe');
        const leftSide = resizer.previousElementSibling;
        const rightSide = resizer.nextElementSibling;


        let x = 0;
        let leftWidth = 0;

        // Handle the mousedown event
        // that's triggered when user drags the resizer
        const mouseDownHandler = function (e) {
            // Get the current mouse position

            x = e.clientX;
            leftWidth = leftSide.getBoundingClientRect().width;
            resizer.style.cursor = 'col-resize';
            document.body.style.cursor = 'col-resize';

            // Attach the listeners to `document`
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);

        };
        // Attach the handler
        resizer.addEventListener('mousedown', mouseDownHandler);

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            if (leftSide && rightSide) {
                const dx = e.clientX - x;


                const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
                leftSide.style.width = `${newLeftWidth}%`;

                leftSide.style.userSelect = 'none';
                leftSide.style.pointerEvents = 'none';

                rightSide.style.userSelect = 'none';
                rightSide.style.pointerEvents = 'none';
            }
        };


        const mouseUpHandler = function () {
            resizer.style.removeProperty('cursor');
            document.body.style.removeProperty('cursor');

            leftSide.style.removeProperty('user-select');
            leftSide.style.removeProperty('pointer-events');

            rightSide.style.removeProperty('user-select');
            rightSide.style.removeProperty('pointer-events');

            // Remove the handlers of `mousemove` and `mouseup`
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    })


    const copyToClipboard = () => {
        copy(code);
        showSuccessToast('Copied')
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {
                !fullScreen &&
                <>
                    <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition duration-200">
                    </div>

                    <div className="flex flex-row border-2 border-t-0 border-gray-600 gap-4" >
                        <Link to="/" className='mt-1 ml-2'>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-5">
                                <FaHome fontSize={18} color="black" />
                            </button>
                        </Link>

                        <div className="dropdownInner">
                            <LanguagesDropdown onSelectChange={onSelectChange} Userlanguage={language} />
                        </div>
                        <div className="dropdownInner">
                            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                        </div>
                        {/* <span>fontsize :  {font_size}</span> */}
                        <div className="px-4 justify-end">
                            <div className="d-flex px-2 py-1 rounded-lg border focus:outline-none hover:bg-gray-700 hover:text-blue-700 focus:z-10  focus:ring-gray-500 bg-gray-800 border-gray-600 hover:text-white hover:bg-gray-700">
                                <label htmlFor="fontsize_lable" className="form-label mr-2 text-gray-100">Font Size</label>
                                <input
                                    type="number"
                                    className="form-control px-3 py-1  text-gray-700 bg-white  border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="fontsize_lable"
                                    placeholder="Font size"
                                    value={font_size}
                                    onChange={(e) => set_font_size(parseInt(e.target.value))}
                                    style={{
                                        width: "80px"
                                    }}
                                />
                            </div>
                        </div>






                        <div className="px-4  mx-auto justify-end flex items-center" style={{
                            flex: 1
                        }} >


                            <button onClick={copyToClipboard} type="button" id="copytxt" className="flex items-center py-2 px-4 mr-3  text-xs font-medium  rounded-lg border focus:outline-none hover:bg-gray-700 hover:text-blue-700 focus:z-10  focus:ring-gray-500 bg-gray-800 border-gray-600 hover:text-white hover:bg-gray-700">
                                <FaRegCopy fontSize={18} color="white" />
                            </button>
                            <button onClick={makeFullScreen} type="button" className="flex items-center py-2 px-4 mr-3 text-xs font-medium  rounded-lg border focus:outline-none hover:bg-gray-700 hover:text-blue-700 focus:z-10  focus:ring-gray-500 bg-gray-800 border-gray-600 hover:text-white hover:bg-gray-700">
                                <FaExpand fontSize={16} color="white" />
                            </button>


                            <button
                                disabled={processing || offlineStatus}
                                onClick={handleCompile} type="button" className="text-white bg-indigo-600 hover:bg-indigo-800   focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center focus:ring-[#2557D6]/50 mr-2">

                                {

                                    processing ?
                                        <>
                                            <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            running...
                                        </>
                                        :
                                        "Run ( F9   ) "

                                }
                            </button>


                            <button onClick={downloadTxtFile} type="button" className="text-white bg-indigo-600 hover:bg-indigo-800   focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center focus:ring-[#2557D6]/50 mr-2">
                                {"Save Code ( ctrl+s )"}
                            </button>

                            <button onClick={resetCode} type="button" className="text-white bg-indigo-600 hover:bg-indigo-800   focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center focus:ring-[#2557D6]/50 mr-2">
                                {"Erase Code ( ctrl+e )"}
                            </button>
                            <button onClick={handleShare} type="button" className="text-white bg-[#db2777] hover:bg-[#ec4899]   focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center focus:ring-[#2557D6]/50 mr-2">
                                Share
                            </button>

                            {/* <a href={`whatsapp://send?text=${code}`} data-action="share/whatsapp/share">
                                
                                <FaWhatsapp color='green' size="30" />
                                
                            </a> */}

                            {/* <RWebShare
                                data={{
                                    text: "Web Share - GfG",
                                    url: "http://localhost:3000",
                                    title: "GfG",
                                    files: [new File([code], 'codetext.txt', { type: "text/plain", })]
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <button>Share on Web</button>
                            </RWebShare> */}

                        </div>
                    </div >
                </>
            }


            < div className="editorlayout flex flex-row  space-x-4 items-start border-2 border-t-0 border-b-0 border-gray-600"
                style={{
                    height: fullScreen ? "99vh" : `calc(100vh - 6.4vh )`,
                }}>
                <div className="flex flex-col h-full justify-start items-end container__left">
                    <CodeEditorWindow
                        code={code}
                        Fontoptions={{
                            fontSize: font_size
                        }}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme.value}
                        isFullScreen={fullScreen}
                    />
                </div>


                <div className="resizer" id="dragMe">
                    <svg stroke="currentColor" fill="#f1f5f9" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                    <svg stroke="currentColor" fill="#f1f5f9" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </div>

                <div className="flex  flex-col container__right relative h-full px-1 pt-1"
                    style={{ flex: "1 1 0%" }}>
                    {
                        fullScreen && <button onClick={makeFullScreen} type="button" className="flex items-center py-2 px-4 mr-3 text-xs font-medium  rounded-lg border focus:outline-none hover:bg-gray-700 hover:text-blue-700 focus:z-10  focus:ring-gray-500 bg-gray-800 border-gray-600 hover:text-white hover:bg-gray-700 mt-2"
                            style={{
                                width: "fit-content"
                            }}>
                            {
                                fullScreen ? <FaCompress color='white' /> : <FaExpand color='white' />

                            }
                        </button>
                    }

                    <OutputWindow lang={language.value} outputDetails={outputDetails} offlineStatus={offlineStatus} />
                    <div className="flex flex-col items-end">
                        <CustomInput
                            customInput={customInput}
                            setCustomInput={setCustomInput}
                        />

                        {fullScreen && <button
                            onClick={handleCompile}
                            disabled={!code || processing}
                            className={classnames(
                                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 font-bold",
                                (!code || processing) ? "opacity-50" : ""
                            )}
                        >
                            {processing ? "Processing..." : "F9 -  Run Code"}
                        </button>}


                    </div>
                    {<OutputDetails runcode={handleCompile} savecode={downloadTxtFile} outputDetails={outputDetails}

                        lang={language.value}
                    />}

                    <StopWatch />

                </div>
            </div >
        </>

    )
}

export default CodeEditor;