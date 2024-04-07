import { Component } from 'react';
import User from './User';
import './about.css';
import UserClass from './UserClass';

class About extends Component{
    constructor(props){
        super(props);
        console.log('Parent constructure is called!');
    }

    componentDidMount(){
        console.log('Parent ComponentDidMount is called!');
    }

    render(){
        console.log('Parent rendered is called!');
        return(
            <div className="container">
                <h1>Welcome to About Us Page!</h1>
                <hr className="hr" />
                <div className="user-list-container">
                    {/* <User name="Sudha Chandan Banerjee" location="Kolkata" />
                    <User name="Tusar panja" location="Medinapur" /> */}
    
                    <UserClass name="SC Banerjee" location="Kolkata" />
                    <UserClass name="T panja" location="Medinapur" />
                </div>
            </div>
        );
    }
}

export default About;