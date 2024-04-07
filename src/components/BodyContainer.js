import ResturantCard from './ResturantCard.js';
import { useState, useEffect } from 'react';
import Shimmer from '../components/Shimmer.js';
import { Link } from 'react-router-dom';
import { REST_CARD_API } from '../utils/constents.js';
// import Search from './Search.js';
import useOnlineStatus from '../utils/useOnlineStatus';
import useRestaurantList from '../utils/useRestaurantList';
import CloseIcon from '@mui/icons-material/Close';


const BodyContainer = () => {

    const [searchText, setSearchText] = useState('');
    const [resturantList, setResturantList] = useState([]);
    const [filteredResturant, setFilteredResturant] = useState([]);
    const [restaurantTitle, setRestaurantTitle] = useState('');
    const [activeFilter, SetActiveFilter] = useState(null);

   const isOnline = useOnlineStatus();

    
    useEffect(()=> {
        fetchData();
        clearFilter();

    }, []);

    // const fetchData = async () => {
    //     try {
    //         const data = await fetch(REST_CARD_API);
    //         const json = await data.json();
    //         //const cards = json?.data?.cards;

    //         console.log(json);
    //         setResturantList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //         setFilteredResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //         setRestaurantTitle(json?.data?.cards[2].card?.card?.title);
    //     }
    //     catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
        
    // };

    const fetchData = async () => {
        try {
            const data = await fetch(REST_CARD_API);
            const json = await data.json();
    
            const cards = json?.data?.cards;
    
            let restaurantCard = null;
    
            // Identify the index of the card containing restaurant data dynamically
            if (Array.isArray(cards)) {
                const desktopIndex = cards.findIndex(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants && card.card.card.gridElements.infoWithStyle.restaurants.length > 0);

                console.log(desktopIndex);

                const mobileIndex = cards.findIndex(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants && card.card.card.gridElements.infoWithStyle.restaurants.length > 0);
                console.log(mobileIndex);
    
                // Check if either desktop or mobile index is found
                if (desktopIndex !== -1) {
                    restaurantCard = cards[mobileIndex];
                } else if (mobileIndex !== -1) {
                    restaurantCard = cards[desktopIndex];
                }
            }
    
            if (!restaurantCard) {
                console.error("No restaurant card found in response");
                return;
            }
    
            setResturantList(restaurantCard.card.card.gridElements.infoWithStyle.restaurants);
            setFilteredResturant(restaurantCard.card.card.gridElements.infoWithStyle.restaurants);
            setRestaurantTitle(restaurantCard.card.card.title);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    // const fetchData = async () => {
    //     try {
    //         const data = await fetch(REST_CARD_API);
    //         const json = await data.json();
    
    //         const cards = json?.data?.cards;

    //         console.log(cards);
    
    //         let restaurantCard = null;
    //         if (Array.isArray(cards)) {
    //             // Find the card with the relevant structure
    //             restaurantCard = cards.find(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //             console.log(restaurantCard);
    //         }
    
    //         // If the expected card is not found, use a fallback mechanism to handle it
    //         if (!restaurantCard) {
    //             // You can define a fallback index or a fallback logic here
    //             restaurantCard = cards; // For example, using the first card as a fallback
    //         }
    
    //         // If restaurantCard is still not found, handle the situation accordingly
    //         if (!restaurantCard) {
    //             console.error("No restaurant card found in response");
    //             return;
    //         }
    
    //         setResturantList(restaurantCard.card.card.gridElements.infoWithStyle.restaurants);
    //         setFilteredResturant(restaurantCard.card.card.gridElements.infoWithStyle.restaurants);
    //         setRestaurantTitle(restaurantCard.card.card.title);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };
    
    

    //Filter Restaurants
    const handleFilter = (filter) => {
        SetActiveFilter(filter);
        if (filter === 'fourplus'){
            const avgRating = filteredResturant.filter((res)=> res?.info?.avgRating > 4);
            setFilteredResturant(avgRating);
            console.log(avgRating);
        }else if(filter === 'price'){
            const priceFilterResult = filteredResturant.filter((res)=> parseFloat(res?.info?.costForTwo.replace('₹', '')) < 250);
            setFilteredResturant(priceFilterResult);
            console.log(priceFilterResult);
        }
        
    };

    const clearFilter = () => {
        SetActiveFilter(null);
        setFilteredResturant(resturantList);
    };

    

    //Onclick Search Function
    // const handleSearch = (e) => {
    //     const inputValue = e.target.value;
    //     setSearchText(inputValue);
    
    //     if (inputValue.trim() === '') {
    //         setFilteredResturant(resturantList);
    //         console.log(resturantList);
    //     } else {
    //         const filteredResult = resturantList.filter((res) => res?.info?.name?.toLowerCase().includes(inputValue.toLowerCase()));
    //         setFilteredResturant(filteredResult);
    //         console.log(filteredResult);
    //     }
    // };

    //On Change Search Function
    const onChangeHandler = (e) => {
        const inputValue = e.target.value;
        setSearchText(inputValue);

        if(inputValue.trim() === '') {
            setFilteredResturant(resturantList);
        }else if (inputValue.length >= 3){
            const filteredResult = resturantList.filter((res) => res?.info?.name?.toLowerCase().includes(inputValue.toLowerCase()));
            console.log(filteredResult);
            setFilteredResturant(filteredResult);
        }
    };

    //Search Clear Function
    const clearSearch = () => {
        setSearchText('');
        setFilteredResturant(resturantList);
        console.log('clicked');
    };

    //Online/Offline Check
    if (isOnline === false){
        return <h1>Opps, Looks like you are offline!</h1>
    }

    //Placeholder UI Display
    if(resturantList.length === 0){
        return(
            <Shimmer/>
        );
    };

    return(
        <div className="body-container mt-8">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-3/4 flex flex-col lg:flex-row justify-start items-center ">
                        <div className="w-full sm:w-96 mb-3 lg:mb-0">
                            <div className="flex items-stretch justify-between relative">
                                <input type="text" className="border border-solid border-stone-300 outline-none px-4 py-2 w-full rounded-s" name="search" value={searchText} onChange={onChangeHandler} placeholder='Search Restaurants...' />
                                {searchText? (
                                    <button className="text-red-500 absolute top-1/2 right-4 -translate-y-1/2" onClick={clearSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                        </svg>
                                    </button>
                                ): (
                                    <button className="text-red-500 absolute top-1/2 right-4 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="ml-5"><span className="mx-3">Filter:</span> 
                            {/* <button className="text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize" type="button" onClick={()=> handleFilter()}>
                                Top Resturants
                            </button> */}
                            <button className={`text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize ${activeFilter === 'fourplus' ? 'bg-rose-600 text-stone-50' : ''}`} onClick={() => handleFilter('fourplus')}>
                                    rating 4.0+
                            </button>
                            {/* <button className="text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize">
                                    Pure veg 
                            </button> */}
                            <button className={`text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize ${activeFilter === 'price' ? 'bg-rose-600 text-stone-50' : ''}`} onClick={()=> handleFilter('price')}>
                                    Less than Rs.300
                            </button>                            
                            {activeFilter ? (
                                <button onClick={()=> clearFilter()}><CloseIcon/></button>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {filteredResturant.length > 0 ? (
                            <div className="">
                                <h3 className="white">Items <strong>{filteredResturant.length}</strong> of {resturantList.length}</h3>
                            </div>
                        ) : ''}
                    </div>
                </div>

                <div>
                    <h2 className="mt-12 mb-6 text-2xl font-bold">{restaurantTitle}</h2>
                    <div className="restaurants-list flex flex-wrap justify-start items-stretch m-4 mx-0 md:-m-4">                        
                        { filteredResturant.length > 0 ? (
                                filteredResturant.map(resturants => (
                                <Link className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-0 md:px-4 my-4" key={resturants.info.id} to={"/restaurants/" + resturants.info.id}><ResturantCard resData={resturants} /></Link>
                                ))
                            ) : (
                                <div className="w-1/2 flex justify-center items-center bg-stone-300 rounded-md p-6 mx-4 mt-7">
                                    <h3 className="">No restaurant found!</h3>
                                </div>
                            )
                        }                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyContainer;