import type { i18n } from "i18next";
import { createContext, useContext, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface I18nContextType{
    translator : (key: string) => string;
    i18n: i18n;
    changeLanguage: (language: string) => Promise<void>
}

interface I18nProviderProps{
    children: ReactNode;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({children}: I18nProviderProps){

    const [translator, i18n] = useTranslation();
    const changeLanguage = async (language: string) => {
        await i18n.changeLanguage(language);
    };

    return(
        <I18nContext.Provider value={{translator, i18n, changeLanguage}}>
            {children}
        </I18nContext.Provider>

    );
}

export function useI18n(){

    const context = useContext(I18nContext);

    if (!context) {
        throw new Error("useI18n must be used inside I18nProvider");
    }

    return context;
}