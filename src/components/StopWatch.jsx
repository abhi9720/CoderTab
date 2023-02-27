import React from 'react'
import { AiOutlineReload, AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
const StopWatch = () => {

    const [isActive, setIsActive] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(true);
    const [show, setShow] = React.useState(true)
    const [time, setTime] = React.useState(0);
    React.useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10); // donot do time+10 inside setTime , use prev time in argumen then add in it
            }, 10);

        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(true)
        setTime(0);
    };
    return (
        <div className='absolute bottom-0 right-0 flex gap-3 justify-center items-center'>


            {
                show && <>
                    <Timer time={time} />
                    <ButtonController
                        show={show}
                        active={isActive}
                        isPaused={isPaused}
                        handleStart={handleStart}
                        handlePauseResume={handlePauseResume}
                        handleReset={handleReset}
                    />
                </>
            }
            {show ? <FaRegEye className='cursor-pointer text-[#94a3b8] hover:text-[#e2e8f0] text-xl' onClick={() => {
                setShow((prev) => !prev)
            }} />
                :
                <div className='flex gap-3 cursor-pointer button'>
                    <FaRegEyeSlash className='cursor-pointer text-[#94a3b8] hover:text-[#e2e8f0] text-xl' onClick={() => {
                        setShow((prev) => !prev)
                    }} />
                </div>
            }


        </div>
    )
}

function ButtonController(props) {
    return (
        <div className='flex gap-3 cursor-pointer button'>
            {
                props.isPaused
                    ?
                    <AiOutlinePlayCircle className='text-[#a16207] hover:text-[#fde047] text-xl' onClick={props.handleStart} />
                    :
                    <AiOutlinePauseCircle className='text-blue-900 hover:text-blue-400 text-xl' onClick={props.handlePauseResume} />
            }
            <AiOutlineReload className='text-rose-800 hover:text-rose-500 text-xl' onClick={props.handleReset} />
        </div>
    )
}

function Timer(props) {
    return (
        <div className="text-[#374151] hover:text-[#cbd5e1] text-xl font-medium font-mono">
            <span className="digits hr">
                {("0" + Math.floor((props.time / 360000) % 60)).slice(-2)}:
            </span>
            <span className="digits min">
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits sec">
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
            </span>
        </div>
    );
}

export default StopWatch