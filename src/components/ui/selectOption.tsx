import type { ReactNode } from 'react';

interface ItemsPopsType {
    title: string;
    value?: string | number;
    children?: ReactNode;
    link?: string;
    onClick?: () => void;
}

interface DropdownPropsType {
    title: string;
    options?: ItemsPopsType[];
    className?: string;
    value?: string;
}

export default function Dropdown({
    title,
    options,
    className,
    value,
}: DropdownPropsType) {

    return (
        <div className="relative inline-block w-full">

            <select
                value={value}
                className={`w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline-none border-1 border-[#E3E4E6]
                    focus:outline-none
                    focus:ring-0
                    focus:border-[#0D1936]
                    ${className ?? ""}`}
                defaultValue=""
                onChange={(e) => {
                    const option = options?.find(
                        (option) => String(option.value) === e.target.value
                    );

                    option?.onClick?.();
                }}
            >

                <option value="" disabled>
                    {title}
                </option>

                {options?.map((option) => {

                    return (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.children}
                            {option.title}
                        </option>
                    );

                })}

            </select>

        </div>
    );
}