import React from 'react'

const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = React.useState(false);

    function downHandler(e) {


        let key = e.key

        if (key === targetKey) {

            setKeyPressed(true);
        }
    }

    const upHandler = (e) => {
        let key = e.key
        if (key === targetKey) {

            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("keydown", downHandler);
        document.addEventListener("keyup", upHandler);
        return () => {
            document.removeEventListener("keydown", downHandler);
            document.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;


}

export default useKeyPress