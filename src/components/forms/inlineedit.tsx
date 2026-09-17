import { useEffect, useRef, useState, type SetStateAction } from "react";

interface Item{
    id: number;
    value: string;
}

interface InlineEditPropsType{
    item: Item;
    setRefreshKey: React.Dispatch<SetStateAction<number>>;
    editFunction: (id: number, data: {}) => void;
}

const InlineEdit = ({item, setRefreshKey, editFunction}: InlineEditPropsType) => {

    const [value, setValue] = useState(item.value);
        useEffect(() => {
        setValue(item.value);
    }, [item.value]);

    const [editing, setEditing] = useState(false);

    const [tempValue, setTempValue] = useState("");

    const handleEdit = () => {
        setTempValue(value);
        setEditing(true);
    };

    const handleSave = async () => {
        if (value === tempValue.trim()) {
            setEditing(false);
        }
        await editFunction(item.id, {name: tempValue});
        setRefreshKey(prev => prev + 1);
        setEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value);
        setEditing(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickOutside = (e: MouseEvent) => {

        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            handleCancel();
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }

    if (editing) {
        return (
            <input
                ref={inputRef}
                autoFocus
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSave();
                    }

                    if (e.key === "Escape" ) {
                        handleCancel();
                    }
                }}
               className="border border-gray-200 px-2 py-2 rounded outline-none"
            />
        );
    }

    return (
        <span
            onClick={handleEdit}
            className="cursor-pointer"
        >
            {value}
        </span>
    );
};

export default InlineEdit;