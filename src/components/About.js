//import { Component } from 'react';
import User from './User';
import './about.css';
//import UserClass from './UserClass';
import { useState, useEffect } from 'react'


const About = () => {

    const  [users, setUsers] = useState('');

    useEffect(()=> {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try{
            const data = await fetch('https://api.github.com/users/sudhabnrj');
            const json = await data.json();
            //console.log(json);
            setUsers(json);
        }catch(error){
            console.error('Error in Fetching Data!', error);
        }
    };

    return(
        <div className="h-screen">
            <div className="container mx-auto px-4 lg:px-0 mt-10">
                <h1 className="text-2xl text mb-9 text-center sm:text-left">Welcome to Shopee Food App</h1>
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <User name={users.name} bio={users.bio} avatar_url={users.avatar_url} company={users.company} location={users.location} email="sudhabnrj@gmail.com" public_repos={users.public_repos} html_url={users.html_url} linkedin_url="https://www.linkedin.com/in/sudhachandan-banerjee" />
                </div>
            </div>
        </div>
    );
};

export default About;