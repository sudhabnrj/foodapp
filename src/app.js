import React, { lazy, Suspense, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header.js';
import BodyContainer from './components/BodyContainer.js';
import Footer from './components/Footer.js';
// import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Error from './components/Error';
import RestaurantsMenu from './components/RestaurantsMenu';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Grocery from './components/Grocery';
import { ThemeProvider } from '../src/utils/ThemeContext';
// import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

const Grocery = lazy(() => import('./components/Grocery.js'));

const About = lazy(()=> import('./components/About.js'));

const AppLayout = () => {

    // const [userName, setUserName] = useState();

    // useEffect(()=> {
    //     const data = {
    //         name: "Sudhabnrj"
    //     };
    //     setUserName(data.name);
    // }, []);


    return(
        <Provider store={appStore}>
            <ThemeProvider>
                {/* <UserContext.Provider value={{contextUser: userName, setUserName }}> */}
                    <div className="app">
                        <Header/>
                        <Outlet/>
                        <Footer/>
                    </div>
                {/* </UserContext.Provider> */}
            </ThemeProvider>
        </Provider>
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
                element: <Suspense fallback={<h1>Loading...</h1>}><About/></Suspense>,
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
            },
            {
                path: '/cart',
                element: <Cart/>,
            }
        ],
        errorElement: <Error/>,
    }
    
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);