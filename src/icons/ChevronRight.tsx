import IconBase from "./IconBase";
import type { IconProps } from "./type";

const ChevronRight = (props: IconProps) => {

    return(
        <IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </IconBase>
    );
}

export default ChevronRight;

