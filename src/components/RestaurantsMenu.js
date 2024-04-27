import StarsIcon from '@mui/icons-material/Stars';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Shimmer from '../components/Shimmer.js';
import { SINGLE_IMAGE } from '../utils/constents.js';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import vegImg from '../images/veg.png';
import nonVegImg from '../images/non-veg.png';
import RestaurantsCategory from './RestaurantsCategory';
import { useState } from 'react';



const RestaurantsMenu = () => {

    const [showIndex, setShowIndex] = useState(null);

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer/>;

    const { 
        name,
        areaName,
        city,
        expectationNotifiers,
        sla, 
        avgRatingString, 
        totalRatingsString, 
        labels,
        feeDetails,
        costForTwoMessage
    } = resInfo?.cards[2]?.card?.card?.info || {};

    // Remove HTML tags from expectationNotifiers
    const sanitizedText = expectationNotifiers && expectationNotifiers[0]?.text.replace(/<\/?[^>]+(>|$)/g, "");

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card && 
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || [];

    //console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const cardTitle = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    const itemsCategory = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        category => category.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    //console.log(itemsCategory);

    

    return (
        <div className="w-full">
            <div className="w-full md:w-3/4 lg:w-[800px] mx-auto">
                <div className="container mx-auto px-4 lg:px-0">
                    <div className="mt-10">
                        <h1 className="text-3xl font-bold mb-3">{name}</h1>
                        <div className="bg-gradient-to-b from-transparent dark:to-slate-700 to-slate-200 rounded-3xl p-2 sm:p-5">
                            <div className="bg-white dark:bg-slate-800 border rounded-xl dark:border-slate-700 p-3 sm:p-5">
                                <div className="flex justify-start items-center">
                                    <div className="flex justify-start items-center">
                                        <StarsIcon className="text-green-700 mr-1 !w-4 !h-4" />
                                        <span className="text-sm sm:text-lg font-medium">{avgRatingString} ({totalRatingsString})</span>
                                    </div>
                                    <span className="text-slate-400 mx-2">|</span>
                                    <div>
                                        <span className="text-sm sm:text-lg font-medium">{costForTwoMessage}</span>
                                    </div>
                                </div>
                                <p className="text-rose-500 font-medium my-2">{labels[2].message}</p>
                                <div className="text-sm font-medium gray-divider relative pl-4">
                                    <span className="absolute h-full bg-stone-500 w-[1px] left-[2px]"></span>
                                    <div className="">
                                        <p><span>Outlet</span><span className="ml-3 text-stone-500 dark:text-slate-300">{city} | {areaName}</span></p> 
                                        <p><span>{sla.minDeliveryTime}-{sla.maxDeliveryTime}</span><span>mins</span></p>
                                    </div>
                                </div>
                                {sanitizedText ? (
                                <div className="flex justify-start items-center mt-3 pt-1 border-t">
                                    <span className="text-stone-500 dark:text-slate-300 font-medium"><DeliveryDiningIcon className="text-stone-500 mr-1" />
                                        {sanitizedText}
                                    </span>
                                </div>) : null
                                }
                            </div>
                        </div>
                    </div>

                    <div className="restaurants-menu-list">
                        {itemsCategory.map((category, index)=> (
                            <RestaurantsCategory key={category?.card?.card.title} data={category?.card?.card} 
                            showItems={index === showIndex ? true : false}
                            setShowIndex = {()=> setShowIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RestaurantsMenu;