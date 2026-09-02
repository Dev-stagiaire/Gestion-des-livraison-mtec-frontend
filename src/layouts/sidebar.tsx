import { useState, type ReactNode } from 'react';
import { SidebarContext } from '../context/SidebarContext';


interface SidebarProps{
    children?: ReactNode;
    logo?: string;
}


const Sidebar = ({children, logo}: SidebarProps) => {

    const [expanded, setExpanded] = useState(true);

    return (
        <aside className={`h-screen duration-200 hidden shrink-0 ${expanded ? "md:flex md:w-20 lg:w-69.5" : "w-20"}`}>
            <nav className='h-full flex flex-col bg-dark'>
                {/* <button onClick={() => setExpanded(state => !state)} className='absolute p-1.5 rounded-lg bg-red-500 hover:bg-gray-100'>
                    {expanded ?  <ChevronLeft size="18" strokeWidth="1.5"/>: <ChevronRight  size="18" strokeWidth="1.5" />}
                </button> */}
                <div className='relative p-4 pb-2 flex justify-center items-center mb-6'>
                    <button className='hidden'></button>
                    <img src={logo} alt="" className={`py-3 px-4 overflow-hidden transition-all  ${expanded ? "w-45" : "w-0"}`}/>
                </div>
                <SidebarContext.Provider value={{ expanded, setExpanded}}>
                    <ul className='flex-1 px-0'>
                        {children}
                    </ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    )
}

export default Sidebar
