import { createContext } from "react";

interface TabsContextType{
    activeItem: string;
    setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);
