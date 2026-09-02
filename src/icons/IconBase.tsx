import type { ReactNode } from "react";
import type { IconProps } from "./type";

interface IconBaseProps extends IconProps{
    children: ReactNode;
}

const IconBase = (props: IconBaseProps) => {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={props.strokeWidth} 
            stroke="currentColor"
            height={props.size}
            width={props.size}
            id={props.id}
            className={props.className + " class-6"}
            {...props}
        >
            {props.children}
        </svg>
    );
};

export default IconBase;