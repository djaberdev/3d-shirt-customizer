import { CustomizeBtn } from "../components";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
    return (
        <div className="tab-content glassmorphism px-3 py-4 h-[202px] rounded-md min-w-[200px] flex flex-col gap-4">
            <textarea
                placeholder="Ask AI..."
                className="aipicker-textarea"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            ></textarea>

            <div className="w-full">
                {
                    generatingImg 
                    ? (
                        <CustomizeBtn
                            type={"outline"}
                            text={"generating..."}
                            customStyles={"text-sm w-full"}
                        />
                    ) 
                    : (
                        <div className="flex items-center gap-3">
                            <CustomizeBtn 
                                type={"outline"}
                                text={"AI Logo"}
                                customStyles={"text-xs w-full"}
                                handleClick={() => handleSubmit("logo")}
                            />

                            <CustomizeBtn 
                                type={"filled"}
                                text={"AI Full"}
                                customStyles={"text-xs w-full"}
                                handleClick={() => handleSubmit("full")}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AIPicker;