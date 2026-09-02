import IconBase from "./IconBase"
import type { IconProps } from "./type"

const EyeSlashIcon = (props: IconProps) => {
    return(

        <IconBase {...props} >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </IconBase>
    );
}

export default EyeSlashIcon;
