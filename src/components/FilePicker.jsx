import CustomizeBtn from "./CustomizeBtn";

const FilePicker = ({ file, setFile, readFile }) => {
    return (
        <div className="tab-content glassmorphism px-3 py-4 h-[202px] rounded-md min-w-[160px] flex flex-col">
            <div className="flex-1 flex flex-col items-start">
                <input 
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <div className="flex items-center gap-3 w-full">
                    <label htmlFor="file-upload" className="w-full text-sm text-center py-2 px-3 bg-transparent border-1 border-[rgba(255,255,255,0.28)] rounded-md cursor-pointer duration-300 hover:border-[rgba(255,255,255,0.4)]">Upload</label>

                    <button 
                        className="w-full text-sm py-2 px-3 bg-red-500/90 rounded-md text-white cursor-pointer duration-300 hover:bg-red-500"
                        onClick={() => {
                            setFile("");
                        }}
                    >Reset</button>
                </div>

                <p className="max-w-[160px] text-[13px] mt-3 truncate">
                    {file ? file.name : "No file selected"}
                </p>
            </div>

            <div className="flex items-center gap-3 w-full">
                <CustomizeBtn 
                    type={"outline"}
                    text={"logo"}
                    handleClick={() => {
                        readFile("logo");
                    }}
                    customStyles={"text-sm w-full"}
                />
                <CustomizeBtn 
                    type={"filled"}
                    text={"full"}
                    handleClick={() => {
                        readFile("full");
                    }}
                    customStyles={"text-sm w-full"}
                />
            </div>
        </div>
    );
};

export default FilePicker;