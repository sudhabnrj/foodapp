import StarsIcon from '@mui/icons-material/Stars';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Shimmer from '../components/Shimmer.js';
import { SINGLE_IMAGE } from '../utils/constents.js';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import vegImg from '../images/veg.png';
import nonVegImg from '../images/non-veg.png';



const RestaurantsMenu = () => {

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

    

    return (
        <div className="w-full">
            <div className="w-full md:w-3/4 lg:w-[800px] mx-auto">
                <div className="container mx-auto px-4 lg:px-0">
                    <div className="mt-10">
                        <h1 className="text-3xl font-bold mb-3">{name}</h1>
                        <div className="bg-gradient-to-b from-transparent to-slate-200 rounded-3xl p-2 sm:p-5">
                            <div className="bg-white border rounded-xl p-3 sm:p-5">
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
                                    <div className=" border-l-emerald-50 border-l-[1px]">
                                        <p><span>Outlet</span><span className="ml-3 text-stone-500">{city} | {areaName}</span></p> 
                                        <p><span>{sla.minDeliveryTime}-{sla.maxDeliveryTime}</span><span>mins</span></p>
                                    </div>
                                </div>
                                {sanitizedText ? (
                                <div className="flex justify-start items-center mt-3 pt-1 border-t">
                                    <span className="text-stone-500 font-medium"><DeliveryDiningIcon className="text-stone-500 mr-1" />
                                        {sanitizedText}
                                    </span>
                                </div>) : null
                                }
                            </div>
                        </div>
                    </div>

                    <div className="restaurants-menu-list">
                        <h3 className="mt-5 mb-6 text-2xl font-bold">Recommended <span className>({itemCards.length})</span></h3>
                        {itemCards.map((menu)=> (
                            <div className="flex justify-between items-start mb-9 pb-9 border-b" key={menu?.card?.info?.id}>
                                <div className="order-2 sm:order-1 w-full pl-6 sm:w-4/5 pr-0 sm:pr-9">
                                    <img className="w-4" src={menu?.card?.info?.isVeg ? vegImg : nonVegImg} alt={menu?.card?.info?.isVeg ? 'Veg' : 'Non-Veg'} />                                
                                    <h4 className="font-semibold text-sm sm:text-xl text-stone-600 my-1">{menu?.card?.info?.name}</h4>
                                    <span className="font-semibold text-md text-rose-500 my-1">₹{menu?.card?.info?.defaultPrice / 100 || menu.card.info.price / 100}</span>
                                    <p className="text-stone-500 text-xs sm:text-sm mt-2 mb-3">{menu?.card?.info?.description}</p>
                                    <button className="bg-rose-400 text-white text-sm sm:text-base font-bold px-4 sm:px-2 w-auto sm:w-[140px] md:w-1/4 py-2 rounded-md" type="button">Add to cart</button>
                                </div>
                                <div className="order-1 sm:order-2 w-[100px] sm:w-1/5 relative">
                                    <img alt="{menu.card.info.name}" className="rounded-xl w-[100px] sm:w-auto aspect-square object-cover" src={SINGLE_IMAGE + menu?.card?.info?.imageId} />
                                    
                                </div>
                            </div>
                        ))}                       
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RestaurantsMenu;