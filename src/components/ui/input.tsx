import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
import EyeIcon from "../../icons/EyeIcon";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    type: string;
    value?: string;
    required?: boolean;
    children?: ReactNode;
}

function Input({id, value, label, type, required = false, onChange, children}: InputProps) {

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="input-box">
            <input
                type={(isPassword && showPassword) ? "text": type}
                className="input-field"
                id={id}
                value={value}
                required={required}
                onChange={onChange}
            />
            <label htmlFor={id} className="label">{label}</label>
            
            {isPassword && (showPassword ? <EyeSlashIcon
                                size="18"
                                strokeWidth="1.5"
                                id="hide-icon"
                                className="icon"
                                onClick={ () => setShowPassword((value) => !value)}
                            /> : <EyeIcon
                                    size="18"
                                    strokeWidth="1.5"
                                    id="view-icon"
                                    className="icon"
                                    onClick={ () => setShowPassword((value) => !value)}
                                />
            )}
           
            {children}
        </div>
    );

}

export default Input