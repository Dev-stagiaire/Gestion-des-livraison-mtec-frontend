import IconBase from "./IconBase";
import type { IconProps } from "./type";

const ChevronLeft = (props: IconProps) => {

    return(
        <IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </IconBase>
    );
}

export default ChevronLeft;
