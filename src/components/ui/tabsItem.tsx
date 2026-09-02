import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface TabsProps{
    to: string;
    name: string;
    children: ReactNode;
}


const TabsItem = ({to, name, children}: TabsProps) => {
  return (
    <div>
        <NavLink
            to={to}
            end
            role="tab"
            className={({ isActive }) =>
                `flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500"
                }`
            }
            >
            {children}

            {name}
        </NavLink>
    </div>
  )
}

export default TabsItem