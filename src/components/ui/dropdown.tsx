import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';


interface ItemsPopsType{
    title: string;
    value?: string | number;
    children?: ReactNode;
    link?: string;
    onClick?: () => void;
}

interface DropdownPropsType{
    title: string;
    value?: string;
    options?: ItemsPopsType[];
    className?: string;
}

// const className = "inset-ring-1 inset-ring-gray-300 shadow-xs";

export default function Dropdown({title, value, options, className}: DropdownPropsType) {

    const [selected, setSelected] = useState(null);
    const [icon, setIcon] = useState<ReactNode | undefined>(undefined);

  return (
    <Menu as="div" className="relative inline-block w-full" >
        <input
            type="hidden"
            name={title}
            value={selected ?? value}
        />
      <MenuButton className="inline-flex justify-center gap-x-1.5 bg-white px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 outline-none
        focus:outline-none
        focus:ring-0
        focus:border-0"
        >
        <div className='flex items-center gap-3'>
            {icon}
            {selected ?? value ?? title}
        </div>
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className={`absolute z-10 mt-2 origin-top-left rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in ${className}`}
      >
        <div className="py-1">
            {options.map((option) => {
                
                if(!option.link){
                    return(
                        <MenuItem>
                            <button
                                type="button"
                                onClick={ () => {
                                    setSelected(option.title);
                                    setIcon(option.children);
                                    option.onClick?.();
                                }}
                                className="flex gap-3 items-center px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                            {option.children}
                            {option.title}
                            </button>
                        </MenuItem>
                    );
                }
                else{
                    return(
                        <MenuItem>
                            <Link
                                to={option.link}
                                className="block px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                onClick={() => {setSelected(option.title)}}
                            >
                                {option.title}
                            </Link>
                        </MenuItem>
                    );
                }
            })

            } 
        </div>
      </MenuItems>
    </Menu>
  )
}