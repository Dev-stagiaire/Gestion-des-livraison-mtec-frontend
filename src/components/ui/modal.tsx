import type { ReactNode } from "react";
import CloseIcon from "../../icons/CloseIcon";

interface AddUserModalProps {
    width: string;
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({ width, children, onClose }: AddUserModalProps) => {
   return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={`relative w-${width} rounded-md bg-white p-6 shadow-lg`}>
                
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                    <CloseIcon size="16" />
                </button>

                <h2 className="text-md font-semibold">
                    Add user
                </h2>

                {children}

            </div>
        </div>
    );
};

export default Modal;