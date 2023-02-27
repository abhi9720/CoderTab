import React from "react";
import { langMap } from "../constants/languageOptions";
const OutputDetails = ({ outputDetails, runcode, savecode }) => {

    function status() {
        if (outputDetails?.error) {
            let strerr = outputDetails?.error;
            if (strerr.indexOf("Error: Timed Out") !== -1) {
                return "Time Limit Exceeded"
            }
            else {
                return "Compilation failed"
            }
        }
        return "Failed to Execute"
    }

    return (
        <>

            {
                (langMap[outputDetails?.language]) ?
                    <>
                        <div className={outputDetails ? "flex justify-between" : "flex justify-end"} >
                            {
                                outputDetails &&
                                <div className="metrics-container mt-4 flex flex-col space-y-3">
                                    <p className="text-sm text-slate-300">
                                        Status:{" "}
                                        <span className="ml-2 font-semibold px-2 py-1 rounded-md bg-gray-100 text-slate-900">
                                            {outputDetails?.success ? "Accepted" : status()}
                                        </span>
                                    </p>

                                    <p className="text-sm text-slate-300">
                                        Time:{" "}
                                        <span className="ml-2 font-semibold px-2 py-1 rounded-md bg-gray-100 text-slate-900">
                                            {outputDetails?.success ? outputDetails.time : "-"}
                                        </span>
                                    </p>
                                </div>
                            }

                        </div>
                    </>
                    :
                    <>
                        <div className={outputDetails ? "flex justify-between" : "flex justify-end"} >
                            {
                                outputDetails &&
                                <div className="metrics-container mt-4 flex flex-col space-y-3">
                                    <p className="text-sm text-slate-300">
                                        Status:{" "}
                                        <span className="ml-2 font-semibold px-2 py-1 rounded-md bg-gray-100 text-slate-900">
                                            {outputDetails?.status?.description}
                                        </span>
                                    </p>
                                    <p className="text-sm text-slate-300">
                                        Memory:{" "}
                                        <span className="ml-2 font-semibold px-2 py-1 rounded-md bg-gray-100 text-slate-900">
                                            {outputDetails?.memory}
                                        </span>
                                    </p>
                                    <p className="text-sm text-slate-300">
                                        Time:{" "}
                                        <span className="ml-2 font-semibold px-2 py-1 rounded-md bg-gray-100 text-slate-900">
                                            {outputDetails?.time}
                                        </span>
                                    </p>
                                </div>
                            }

                        </div>
                    </>
            }




        </>
    );
};

export default OutputDetails;