import type { ReactNode } from "react";
import CloseIcon from "../../icons/CloseIcon";

interface AddUserModalProps {
    title: string;
    width: string;
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({ title, width, children, onClose }: AddUserModalProps) => {
   return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={`relative rounded-md bg-white p-6 shadow-lg`} style={{ width: `${width}px` }}>
                
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                    <CloseIcon size="16" />
                </button>

                <h2 className="text-md font-semibold">
                    {title}
                </h2>

                {children}

            </div>
        </div>
    );
};

export default Modal;