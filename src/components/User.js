import './user.css';
import { useState } from 'react'
const User = (props) => {

    const {name, location} = props;
    const [count] = useState(1);

    return(
        <div className="user-card">
            <div className="user-thumb">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e0839ff574213e6f35b3899ebf1fc597" alt="user"/>
            </div>
            <div className="user-content">
                <p>Count: {count}</p>
                <h4>User Name : {name}</h4>
                <h5>Location: {location}</h5>
                <p>Contact: sudha.banerjee@codeclouds.in</p>
            </div>
        </div>
    );
}
export default User;