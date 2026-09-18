import CloseIcon from "../../icons/CloseIcon";
import { createPortal } from "react-dom";

interface NotificationProps {
    message: string;
    type?: "error" | "success" | "warning";
    onClose: () => void;
} 

 const Notification = ({ message, type = "error", onClose }: NotificationProps) => { 

    return createPortal(
        <div className="fixed top-0 left-0 z-50 w-[350px] animate-[slideDown_0.35s_ease-out]"> 
            <div className="flex items-start gap-3 rounded border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-md"> 
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${ type === "error" ? "bg-red-100 text-red-600" : type === "success" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600" }`} > 
                    {
                        type === "error" ? "!" : type === "success" ? "✓" : "!"
                    } 
                </div> 
                <div className="flex-1"> 
                    <p className="text-sm font-medium text-gray-900">
                        {
                            type === "error" ? "Error" : type === "success" ? "Success" : "Warning"
                        }
                    </p> 
                    <p className="mt-1 text-sm text-gray-500">
                        {message}
                    </p> 
                </div> 
                <button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600" > 
                    <CloseIcon size="16" /> 
                </button>
            </div>
        </div> ,
        document.body
    ); 
}; 

export default Notification;