import { LOGO_URL, ONLINE, OFFLINE } from '../utils/constents';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import Avatar from '../images/avatar.png';

const Header = () =>{

    const [accButton, setAccountButton] = useState('Login');

    const  isOnline = useOnlineStatus();

    const accountHandler = () => {
        accButton === 'Login' ? setAccountButton('Logout') : setAccountButton('Login');
    };

    return(
        <header className="bg-slate-50 shadow-md min-h-24 pb-3 lg:pb-0">
            <div className="container mx-auto px-4 md:px-0">
                <div className="flex justify-between items-center lg:flex-row flex-col">
                    <div className="logo-container">
                        <Link to="/"><img className="w-32 lg:w-40" src={LOGO_URL} /></Link>
                    </div>
                    <div className="flex flex-col lg:flex-row navbar">
                        <ul className="flex justify-end items-center gap-x-3 md:gap-x-8 lg:text-lg xl:text-xl font-semibold text-stone-800">                            
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/grocery">Grocery</Link></li>
                            <li>Cart</li>                            
                        </ul>
                        <div className="flex justify-center lg:justify-start items-center mt-2 lg:mt-0">
                            <div className="mx-5">
                                <button type="button" className="text-base bg-red-400 text-stone-50 px-5 py-2 flex items-center justify-center rounded-md" onClick={()=> {accountHandler()}}>{accButton}</button>
                            </div>
                            <div className="flex items-center font-normal">
                                <span className='relative'>
                                    <img className="w-12" src={Avatar} />
                                    <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-600'} block absolute bottom-[4px] right-0`}></span>
                                </span>
                            </div>
                            {/* <div className="flex items-center font-normal">
                                {
                                    isOnline ? (<span className="online-status"><img className="w-24" src={Avatar} /></span>) :
                                    (<span className="offline-status"><img className="w-24" src={Avatar} /></span>)
                                }
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;