import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import BodyContainer from './components/BodyContainer.js';
import Footer from './components/Footer.js';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantsMenu from './components/RestaurantsMenu';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Grocery from './components/Grocery';

const Grocery = lazy(() => import('./components/Grocery.js'));

const AppLayout = () => {
    return(
        <div className="app">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

const appRouter = createBrowserRouter ([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                path: '/',
                element: <BodyContainer/>,
            },
            {
                path: '/about',
                element: <About/>,
            },
            {
                path: '/contact',
                element: <Contact/>,
            },
            {
                path: '/grocery',
                element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>,
            },
            {
                path: '/restaurants/:resId',
                element: <RestaurantsMenu/>,
            }
        ],
        errorElement: <Error/>,
    }
    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);