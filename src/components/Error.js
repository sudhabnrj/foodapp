import React from 'react'
import { useRouteError, Link } from 'react-router-dom'
import pizza from '../images/pizza.webp';

const Error = () => {
    const err = useRouteError();
    console.log(err);
  return (
    <div className="bg-slate-900 h-screen">
      <div className="container mx-auto px-4 lg:px-0 h-full flex items-center justify-center">
        <div className="flex flex-col justify-center items-center text-center">
          {/* <h1>Oops you have entered wrong input!</h1> */}
          <h1 className="text-yellow-300 font-black text-9xl flex justify-center items-center">
            4<span><img src={pizza} className="w-[400px]" /></span>4
          </h1>
          <p className="text-white font-bold text-3xl">Oops... Page {err.statusText}</p>
          <p className="text-white my-4 font-medium">The page you were looking for doesn't exist</p>
          <p><Link to="/" className="text-white border rounded-lg py-2 px-5 mt-5 inline-block">Back To Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Error
