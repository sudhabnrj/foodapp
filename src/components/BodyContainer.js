import ResturantCard, {discountTag} from './ResturantCard.js';
import { useState, useEffect, useContext } from 'react';
import Shimmer from '../components/Shimmer.js';
import { Link } from 'react-router-dom';
import { REST_CARD_API } from '../utils/constents.js';
import Search from './Search.js';
import useOnlineStatus from '../utils/useOnlineStatus';
import useRestaurantList from '../utils/useRestaurantList';
import CloseIcon from '@mui/icons-material/Close';
import Banner from './Banner';
// import UserContext from '../utils/UserContext';
import CategoryCarousel from './CategoryCarousel';
import Slider from "react-slick";
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';


const BodyContainer = ({src, name}) => {

    const [searchText, setSearchText] = useState('');
    const [resturantList, setResturantList] = useState([]);
    const [filteredResturant, setFilteredResturant] = useState([]);
    const [restaurantTitle, setRestaurantTitle] = useState('');
    const [activeFilter, SetActiveFilter] = useState(null);
    const [catCarousel, setCatCarousel] = useState([]);

    // const { setUserName, contextUser } = useContext(UserContext);
    

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

            console.log(cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    
            setResturantList(cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilteredResturant(cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setRestaurantTitle(cards[2]?.card?.card?.title);
            setCatCarousel(cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
            //console.log(cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
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
            //console.log(avgRating);
        }else if(filter === 'price'){
            const priceFilterResult = filteredResturant.filter((res)=> parseFloat(res?.info?.costForTwo.replace('₹', '')) < 300);
            setFilteredResturant(priceFilterResult);
            //console.log(priceFilterResult);
        }else if(filter === 'veg'){
            const vegFilterResult = filteredResturant.filter((res) => res.info.veg === true );
            setFilteredResturant(vegFilterResult);
            console.log(vegFilterResult);
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
            //console.log(filteredResult);
            setFilteredResturant(filteredResult);
        }
    };

    //Search Clear Function
    const clearSearch = () => {
        setSearchText('');
        setFilteredResturant(resturantList);
        //console.log('clicked');
    };

    //Online/Offline Check
    if (isOnline === false){
        return <h1 className='text-center mt-5 font-medium'>Opps, Looks like you are <span className='font-bold'>offline!</span></h1>
    }

    //Placeholder UI Display
    if(resturantList.length === 0){
        return(
            <Shimmer/>
        );
    };

    //Carousel category
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        initialSlide: 0,
        responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 8,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
        {
            breakpoint: 380,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
        ]
    };


    return(
        <div className="body-container">
            <Banner/>
            {/* What's on your mind? */}
            <div className="my-10">
                <div className="container mx-auto px-4 lg:px-0">
                    <div className="relative">
                        <h1 className="mt-12 mb-6 text-2xl font-bold">What's on your mind?</h1>
                        <div className="slider-container">
                            <Slider {...settings}>
                                {catCarousel.map((item)=> {
                                    //console.log(item.action.text);
                                    return <CategoryCarousel key={item.id} src={item.imageId} name={item.action.text} />
                                })}
                            </Slider>                      
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full lg:w-3/4 flex flex-col lg:flex-row justify-start items-center ">
                        {/* Search Bar*/}
                        <Search searchText={searchText} onChangeHandler={onChangeHandler} clearSearch={clearSearch} />

                        <div className="ml-5"><span className="mx-3">Filter:</span> 
                            {/* <button className="text-sm rounded-full border border-stone-300 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize" type="button" onClick={()=> handleFilter()}>
                                Top Resturants
                            </button> */}
                            <button className={`text-sm rounded-full border border-stone-300 dark:border-slate-700 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize ${activeFilter === 'fourplus' ? 'bg-rose-600 text-stone-50' : ''}`} onClick={() => handleFilter('fourplus')}>
                                    rating 4.5+
                            </button>
                            <button className={`text-sm rounded-full border border-stone-300 dark:border-slate-700 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize ${activeFilter === 'veg' ? 'bg-rose-600 text-stone-50' : ''}`} onClick={() => handleFilter('veg')}>
                                    Pure veg 
                            </button>
                            <button className={`text-sm rounded-full border border-stone-300 dark:border-slate-700 border-solid px-3 py-1 hover:text-stone-50 hover:bg-rose-400 hover:border-rose-400 transition-all mr-1 capitalize ${activeFilter === 'price' ? 'bg-rose-600 text-stone-50' : ''}`} onClick={()=> handleFilter('price')}>
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
                    {/* <div className="flex items-center">
                        <label>User:</label>
                        <input type="text" value={contextUser} onChange={(e)=> setUserName(e.target.value)} className="p-4 text-black" />
                    </div> */}
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