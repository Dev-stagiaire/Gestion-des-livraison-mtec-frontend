import { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";

interface Option {
    value: string | number;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    translator?: (string) => string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const MultiSelect = ({options, value, onChange, placeholder = "Sélectionner...", translator, setValue}: MultiSelectProps) => {
    
    const [open, setOpen] = useState(false);

    const toggleOption = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((item) => item !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const removeOption = (optionValue: string) => {
        onChange(value.filter((item) => item !== optionValue));
    };

    return (
        <div className="relative w-full app-text app-input-text-size">
            {/* Input */}
            <div
                onClick={() => setOpen(!open)}
                className="min-h-[55px] w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2"
            >
                <div className="flex flex-wrap gap-2">
                    {value.length > 0 ? (
                        value.map((selectedValue) => {
                            const option = options.find((item) => {
                                return item.value === Number(selectedValue);
                            });

                            return (
                                    <span
                                        key={selectedValue}
                                        className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs"
                                    >
                                        {option?.label}

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeOption(selectedValue);
                                            }}
                                            className="text-gray-500 hover:text-gray-900"
                                        >
                                            ×
                                        </button>
                                    </span>
                            );
                        })
                    ) : (
                        <span className="">
                            {placeholder}
                        </span>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-1 max-h-60 w-full px-1 overflow-auto rounded border border-gray-200 bg-white shadow-lg text-xs">
                    <div className="flex px-3">
                        <div className='flex gap-1 px-2 h-10 w-full items-center border-1 border-solid border-gray-200'>
                            <SearchIcon size="18" strokeWidth="1.5"/>
                            <input
                                type='search'
                                name='search'
                                placeholder={translator("search")}
                                className='relative w-full px-3 text-sm outline-none'
                                onChange={(e) => setValue(e.target.value)}
                            /> 
                        </div>
                    </div>
                    {options.map((option) => {
                        const selected = value.includes(String(option.value));

                        return (
                            <div
                                key={option.value}
                                onClick={() => toggleOption(String(option.value))}
                                className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-xs hover:bg-gray-100 ${
                                    selected ? "bg-gray-50" : ""
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected}
                                    readOnly
                                />

                                <span>{option.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;