import { proxy, subscribe } from "valtio";

// Restore or Initialize State
const saved = window.localStorage.getItem("appState");
export const state = proxy(
    
    saved 
    ? JSON.parse(saved) 
    : {   
        intro: true,
        color: "#1976d2",
        isLogoTexture: true,
        isFullTexture: false,
        logoDecal: "/public/threejs.png",
        fullDecal: "/public/threejs.png",
        enableSave: false,
    }
    
);

// Save State to Local Storage Only If EnalbeSave is true
let timeout;
let prevEnableSave = state.enableSave;
subscribe(state, () => {
    if (state.enableSave || prevEnableSave !== state.enableSave) {
        clearTimeout(timeout);
            timeout = setTimeout(() => {
                window.localStorage.setItem("appState", JSON.stringify(state));
                console.log("State saved to local storage!");
                prevEnableSave = state.enableSave;
        }, 300);
    }
});