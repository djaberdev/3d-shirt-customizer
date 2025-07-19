import { useSnapshot } from "valtio";
import { state } from "../store";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {

    const snap = useSnapshot(state);

    const activeStyles = isFilterTab && isActiveTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : {}

    return (
        <button
            key={tab.name}
            style={activeStyles}
            className={`tab-btn glassmorphism ${isFilterTab ? "rounded-full" : "rounded-lg"} ${tab.name === "download" && "hover:opacity-80"} ${tab.name === "aipicker" ? "disabled" : ""}`}
            onClick={handleClick}
        >
            <img 
                src={tab.icon} 
                alt={tab.name} 
                className={`duration-300 ${isActiveTab ? "w-[65%] h-[65%]" : "w-[78%] h-[78%]"}`}
            />
        </button>
    );
};

export default Tab;