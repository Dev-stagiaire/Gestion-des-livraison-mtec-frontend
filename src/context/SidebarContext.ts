import React, { createContext } from "react";

interface SidebarContextType{
    expanded: boolean;
    setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);