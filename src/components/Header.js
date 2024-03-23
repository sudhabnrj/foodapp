import { LOGO_URL } from '../utils/constents.js'
import { useState } from 'react';
import {Link} from 'react-router-dom';

const Header = () =>{

    const [accButton, setAccountButton] = useState('Login');

    const accountHandler = () => {
        accButton === 'Login' ? setAccountButton('Logout') : setAccountButton('Login');
    };

    return(
        <div className="header">
            <div className="container d-flex justify-content-between">
                <div className="logo-container">
                    <Link to="/"><img className="logo" src={LOGO_URL} /></Link>
                </div>
                <div className="nav-items d-flex">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li>Cart</li>
                        <li>
                            <button type="button" className="account-btn" onClick={()=> {accountHandler()}}>{accButton}</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;