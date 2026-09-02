import { useContext, useState, type ReactNode } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { NavLink } from "react-router";

interface SidebarItemsProps{
    to: string;
    icon: ReactNode;
    text: string;
    alert?: boolean | null;
}

export function SidebarItem({to, icon, text, alert = false}: SidebarItemsProps){
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("SidebarItem must be use inside an sidebar provider");
    }
    const { expanded } = context;
    return(
        <NavLink
            to={to}
            className={ ({isActive}) => `group relative w-full flex items-center md:justify-center py-5 px-4 my-0 cursor-pointer transition-colors duration-200 hover:scale-y-105 transition-transform text-md item border-b-1 border-solid border-gray-200/20
                ${isActive
                    ? "active font-medium"
                    : ""
                }`}
        >   
        {icon}
        <span className={`hidden lg:block overflow-hidden transition-all ${expanded ? "lg:w-52 lg:ml-3" : "w-0"}`}>
            {text}
        </span> 
            {alert && (<div className={`absolute right-4 w-2 h-2 rounded bg-red-300 ${expanded ? "" : "top-2"}`}></div>)}
        </NavLink>
    );
}

