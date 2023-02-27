import { toast } from "react-toastify";

export const showSuccessToast = (msg, time = 1000) => {
    toast.success(msg || `Compiled Successfully!`, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
export const showErrorToast = (msg) => {
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
