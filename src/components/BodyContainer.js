import ResturantCard, {discountTag} from './ResturantCard.js';
import { useState, useEffect } from 'react';
import Shimmer from '../components/Shimmer.js';
import { Link } from 'react-router-dom';
import { REST_CARD_API } from '../utils/constents.js';
import Search from './Search.js';
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
   const ResturantWithDiscount = discountTag(ResturantCard);

    
    useEffect(()=> {
        fetchData();
        clearFilter();

    }, []);    

    const fetchData = async () => {
        try {
            const data = await fetch(REST_CARD_API);
            const json = await data.json();
    
            const cards = json?.data?.cards;
    
            let restaurantCard = null;
    
            // Identify the index of the card containing restaurant data dynamically
            if (Array.isArray(cards)) {
                const desktopIndex = cards.findIndex(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants && card.card.card.gridElements.infoWithStyle.restaurants.length > 0);

                //console.log(resturantList);

                const mobileIndex = cards.findIndex(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants && card.card.card.gridElements.infoWithStyle.restaurants.length > 0);
                //console.log(mobileIndex);
    
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
            setRestaurantTitle(restaurantCard.card?.card?.title);
            //console.log("Restaurant:", restaurantCard.card);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    

    //Filter Restaurants
    const handleFilter = (filter) => {
        SetActiveFilter(filter);
        if (filter === 'fourplus'){
            const avgRating = filteredResturant.filter((res)=> res?.info?.avgRating > 4.5);
            setFilteredResturant(avgRating);
            console.log(avgRating);
        }else if(filter === 'price'){
            const priceFilterResult = filteredResturant.filter((res)=> parseFloat(res?.info?.costForTwo.replace('₹', '')) < 300);
            setFilteredResturant(priceFilterResult);
            console.log(priceFilterResult);
        }
        
    };

    const clearFilter = () => {
        SetActiveFilter(null);
        setFilteredResturant(resturantList);
    };

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
                        {/* Search Bar*/}
                        <Search searchText={searchText} onChangeHandler={onChangeHandler} clearSearch={clearSearch} />

                        <div className="ml-5"><span className="mx-3">Filter:</span> 
                            {/* <button className="text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize" type="button" onClick={()=> handleFilter()}>
                                Top Resturants
                            </button> */}
                            <button className={`text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize ${activeFilter === 'fourplus' ? 'bg-rose-600 text-stone-50' : ''}`} onClick={() => handleFilter('fourplus')}>
                                    rating 4.5+
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
                    <h2 className="mt-12 mb-6 text-2xl font-bold">{restaurantTitle ? restaurantTitle : "Restaurants"}</h2>
                    <div className="restaurants-list flex flex-wrap justify-start items-stretch m-4 mx-0 md:-m-4">                        
                        { filteredResturant.length > 0 ? (
                                filteredResturant.map(resturants => (
                                <Link className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-0 md:px-4 my-4" key={resturants.info.id} to={"/restaurants/" + resturants.info.id}>
                                    {resturants.info.badges.imageBadges  ? 
                                        <ResturantWithDiscount resData={resturants} /> : <ResturantCard resData={resturants} />
                                    }
                                </Link>
                                ))
                            ) : (
                                <div className="w-full flex justify-center items-center bg-stone-300 dark:bg-slate-800 rounded-md p-6 mx-4 mt-7">
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