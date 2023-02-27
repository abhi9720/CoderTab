import React from 'react'
import { langMap } from "../constants/languageOptions";
const OutputWindow = ({ outputDetails, offlineStatus }) => {


    const getOutput = () => {
        if (langMap[outputDetails.language]) {

            if (outputDetails.error) {
                return (<pre className="px-2 py-1 font-normal  text-red-500">
                    {outputDetails.error}
                </pre>)
            }
            else {
                return (<pre className="px-2 py-1 font-normal  text-green-500">
                    {outputDetails.output}
                </pre>)
            }

        }
        else if (outputDetails) {
            let statusId = outputDetails?.status?.id;

            if (statusId === 6) {
                // compilation error
                return (
                    <pre className="px-2 py-1 font-normal  text-red-500">
                        {atob(outputDetails?.compile_output)}
                    </pre>
                );
            } else if (statusId === 3) {
                return (
                    <pre className="px-2 py-1 font-normal  text-green-500">
                        {atob(outputDetails.stdout) !== null
                            ? `${atob(outputDetails.stdout)}`
                            : null}
                    </pre>
                );
            } else if (statusId === 5) {
                return (
                    <pre className="px-2 py-1 font-normal  text-red-500">
                        {`Time Limit Exceeded`}
                    </pre>
                );
            } else {
                // return (
                //     <pre className="px-2 py-1 font-normal  text-red-500">
                //         {atob(outputDetails?.stderr)}
                //     </pre>
                // );
            }
        }
    };
    return (
        <>
            <h1 className="font-bold text-xl text-transparent mb-2 flex justify-between text-zinc-100">
                Output
                {
                    offlineStatus ?
                        <>

                            <span className='flex gap-1 items-center text-[#f43f5e]'  >
                                <span className='text-xl'>●</span>
                                <span className='text-sm'>Internet DisConnected</span>
                            </span>
                        </>
                        :
                        <>
                            <span className='flex gap-1 items-center text-[#4ade80] '  >
                                <span className='text-xl'>●</span>
                                <span className='text-sm'>Internet Connected</span>
                            </span>
                        </>

                }

            </h1>
            <div className="w-full h-60 bg-[#1e293b] shadow-lg rounded-md text-white font-normal text-sm overflow-y-auto border border-gray-600" >
                {outputDetails ? <>{getOutput()}</> : null}
            </div>
        </>
    );
}

export default OutputWindow