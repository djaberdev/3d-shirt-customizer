import { state } from "../store";
import { useSnapshot } from "valtio";

import { headButtonAnimation } from "../config/motion";

import { getContrastingColor } from "../config/helpers";

const CustomizeBtn = ({ text, type, handleClick, customStyles }) => {

    const snap = useSnapshot(state);

    const generateStyle = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type === "outline") {
            return {
                backgroundColor: "transparent",
                borderColor: snap.color,
                color: snap.color,
            }
        }
    }

    return (
        <button
            {...headButtonAnimation}
            onClick={handleClick}
            className={`px-4 py-2 rounded-md duration-400 cursor-pointer active:scale-95 ${type === "outline" ? "border-1" : ""} ${customStyles}`}
            style={generateStyle(type)}
        >
            {text}
        </button>
    );
};

export default CustomizeBtn;