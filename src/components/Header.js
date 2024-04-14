import { LOGO_URL, ONLINE, OFFLINE } from '../utils/constents';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import Avatar from '../images/avatar.png';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useTheme} from '../utils/ThemeContext';

const Header = () =>{

    const [accButton, setAccountButton] = useState('Login');
    const { isDarkMode, toggleMode } = useTheme();
    const [mobileNavMenu, setMobileNavMenu] = useState(false);

    const  isOnline = useOnlineStatus();

    const accountHandler = () => {
        accButton === 'Login' ? setAccountButton('Logout') : setAccountButton('Login');
    };

    const handleNavMenu = () => {
        setMobileNavMenu(!mobileNavMenu);
    };

    return(
        <header className={`dark:bg-slate-800 light:bg-slate-50 shadow-md lg:min-h-24 pb-3 lg:pb-0 ${mobileNavMenu === true ? 'opened' : ''}`}>
            <div className="container mx-auto px-4 md:px-0">
                <div className="flex justify-between items-center flex-row">
                    <div className="logo-container w-4/12 sm:w-2/12">
                        <Link to="/"><img className="w-32 lg:w-40" src={LOGO_URL} alt="Shopee Food" /></Link>
                    </div>
                    <div className="flex flex-row w-8/12 sm:w-10/12">
                        <div className="w-full flex justify-end items-center">
                            {mobileNavMenu && (
                                <ul className={`flex flex-col lg:flex-row lg:justify-end lg:items-center gap-x-3 md:gap-x-8 lg:text-lg xl:text-xl font-semibold text-stone-200 fixed lg:relative top-0 bg-slate-700 lg:bg-transparent h-full lg:h-auto w-[250px] lg:w-auto p-5 lg:p-0 z-20 lg:z-auto gap-y-3 lg:gap-y-0 transition-all lg:left-0 ${mobileNavMenu === true ? 'left-0' : 'left-[-250px]'}`}>                            
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about">About Us</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                    <li><Link to="/grocery">Grocery</Link></li>
                                    <li>Cart</li>
                                    <li>
                                        <div className="">
                                            <button type="button" className="w-full text-base bg-red-400 text-stone-50 px-5 py-2 flex items-center justify-center rounded-md" onClick={()=> {accountHandler()}}>{accButton}</button>
                                        </div>
                                    </li>                      
                                </ul>
                            )}
                            <ul className="flex flex-col lg:flex-row lg:justify-end lg:items-center gap-x-3 md:gap-x-8 lg:text-lg xl:text-xl font-semibold text-stone-800 dark:text-stone-200 fixed lg:relative left-[-255px] lg:left-0 top-0 bg-slate-700 lg:bg-transparent h-full lg:h-auto w-[250px] lg:w-auto p-5 lg:p-0 z-10 lg:z-auto gap-y-3 lg:gap-y-0">                            
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/grocery">Grocery</Link></li>
                                <li>Cart</li>
                                <li>
                                    <div className="mx-5">
                                        <button type="button" className="text-base bg-red-400 text-stone-50 px-5 py-2 flex items-center justify-center rounded-md" onClick={()=> {accountHandler()}}>{accButton}</button>
                                    </div>
                                </li>                      
                            </ul>
                            <div className="flex justify-end lg:justify-end items-center mt-2 lg:mt-0">
                                <div className="">
                                    <button onClick={toggleMode}>
                                        {isDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
                                    </button>
                                </div>
                                
                                <div className="flex items-center font-normal mx-5">
                                    <span className='relative'>
                                        <img className="w-12" src={Avatar} alt="Avatar" />
                                        <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-600'} block absolute bottom-[4px] right-0`}></span>
                                    </span>
                                </div>
                                <button className="humberger-menu flex items-center relative lg:hidden" onClick={handleNavMenu}>
                                    <span className="line-icon bg-slate-700 dark:bg-white"></span>
                                    <span className="line-icon bg-slate-700 dark:bg-white"></span>
                                    <span className="line-icon bg-slate-700 dark:bg-white"></span>
                                    <span className="line-icon bg-slate-700 dark:bg-white"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;