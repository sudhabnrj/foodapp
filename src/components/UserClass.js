import React from 'react';
import {useState} from 'react';
class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList: {
                name: 'dummy',
                location: 'test',
                avatar_url: ''
            }
        }
        console.log('Child constructure is called!');
    }
    async componentDidMount(){
        //console.log('Child ComponentDidMount is called!');

        const data = await fetch('https://api.github.com/users/sudhabanerjeecc');
        const json = await data.json();
        console.log(json);
        this.setState({
            userList: json
            
        })
        console.log(json);
    }
    render(){
        const {name, avatar_url, location} = this.state.userList;
        return(
            <div className="user-card">
                <div className="user-thumb">
                    <img src={avatar_url} alt="user"/>
                </div>
                <div className="user-content">
                    <h4>User Name : {name}</h4>
                    <h5>Location: {location}</h5>
                    <p>Contact: sudha.banerjee@codeclouds.in</p>
                </div>
            </div>
        );
    }
}

export default UserClass;