import { useI18n } from '../context/AppContext';
import Dropdown from '../components/ui/dropdown';
import SearchIcon from '../icons/SearchIcon';
import { useAuth } from '../hooks/useAuth';
import { FR, GB } from "country-flag-icons/react/3x2";
import { useEffect, useState } from 'react';

interface SearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Topbar = ({search, setSearch}: SearchProps)  => {

    const { user, logout } = useAuth();
  
    const {translator, changeLanguage} = useI18n();

    return (
        <div className='relative flex justify-between items-center py-2 px-7 h-18 w-full top-0 border-b-1 border-b-gray-200 shadow-xs bg-white'>
                
            <div className='flex gap-1 px-2 h-10 w-60 items-center border-1 border-solid border-gray-200 rounded'>
                <SearchIcon size="25" strokeWidth="1.5"/>
                <input
                    type='search'
                    name='search'
                    value={search}
                    onChange={ (e) => setSearch(e.target.value)}
                    placeholder={translator("search")}
                    className='relative w-full px-3 text-sm outline-none'
                /> 
            </div>
            <div className='flex items-center gap-5'>

                <div className=''>
                    <Dropdown className='right-0 w-26' title='Language' options={[{title: "EN", children : <GB className="w-5 h-4" />, onClick: () => changeLanguage("en") }, {title: "FR", children: <FR className="w-5 h-4" />, onClick: () => changeLanguage("fr")}]}/>
                </div>
                <div className="h-6 w-px bg-gray-300" />
                <div className='flex items-center gap-2'>
                    <img src="" alt="" className='rounded-full h-8 w-8 border-1 border-gray-100'/>
                    <Dropdown className='right-0 w-38' title={user ? user.first_name : "Profile"} options={ [ {title: "Your profile", link: ""}, {title : "Sign out", onClick: logout} ] }>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
