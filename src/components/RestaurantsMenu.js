import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import './restaurantsMenu.css';
import { SINGLE_IMAGE, VEG, NON_VEG, MENU_API } from '../utils/constents.js';
import { useParams } from 'react-router-dom';


const RestaurantsMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams();

    useEffect(()=> {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try{
            const data = await fetch(MENU_API + resId);

            const json = await data.json();

            console.log(json);
            setResInfo(json.data);
        }
        catch(error){
            console.log(error);
        }

    };

    if (resInfo === null) return <Shimmer/>;

    const { 
        name, 
        areaName, 
        sla, 
        avgRatingString, 
        totalRatingsString, 
        labels,
        feeDetails,
        costForTwoMessage
    } = resInfo?.cards[0]?.card?.card?.info || [];

    const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || [];

    console.log(resInfo);

    return (
        <div className="single-restaurants">
            <div className="container">
                <div className="res-header">
                    <div className="title-info">
                        <h1>{name}</h1>
                        <p className="res-cuisines">{labels[2].message}</p>
                        <p className="res-area">{areaName} <span>{sla.lastMileTravelString}</span></p>
                        <ul>
                            <li className="restaurantsMessage_wrapper">
                                {feeDetails && feeDetails.message && feeDetails.message.length === 0 && (
                                <><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/v1648635511/Delivery_fee_new_cjxumu" alt="DISTANCE_FEE_NON_FOOD_LM" className="restaurantsMessage_icon" />
                                <span className="restaurantsMessage_text">{feeDetails.message}</span></>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className="restaurant-ratings-header">
                        <span className="restaurant_avgRating">
                            <span className="icon-star"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg></span> 
                            <span>{avgRatingString}</span> 
                        </span>
                        <p className="restaurant_totalRatings">{totalRatingsString}</p>
                    </div>
                </div>

                <ul className="RestaurantTimeCost_wrapper">

                    {sla && sla.slaString && sla.slaString.length === 0 (<li className="RestaurantTimeCost_item">
                        <svg className="RestaurantTimeCost_icon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="#3E4152" strokeWidth="1.3"></circle>
                            <path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="#3E4152"></path>
                        </svg>
                        <span>{sla.slaString}</span>
                    </li>)}
                    <li className="RestaurantTimeCost_item">
                        <svg className="RestaurantTimeCost_icon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <circle cx="9" cy="9" r="8.25" stroke="#3E4152" strokeWidth="1.5"></circle>
                            <path d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z" fill="#3E4152"></path>
                        </svg>
                        <span>{costForTwoMessage}</span>
                    </li>
                </ul>

                <div className="restaurants-menu-list">
                    <h3>Recommended Menus</h3>
                    {itemCards.map((menu)=> (
                        <div className="dish-item" key={menu.card.info.id}>
                            <div className="details-container">
                                {menu.card.info.isVeg ? 
                                    <span className="icon-Veg">Veg</span> : 
                                    <span className="icon-NonVeg">Non_Veg</span>
                                }                                
                                <h4 className="itemNameText">{menu.card.info.name}</h4>
                                <span className="rupee">₹{menu.card.info.defaultPrice / 100 || menu.card.info.price / 100}</span>
                                <p className="itemDesc">{menu.card.info.description}</p>
                                <button className="itemCart btn-cart" type="button">Add to cart</button>
                            </div>
                            <div className="items-image-container">
                                <img alt="Chicken Kebabs Platter- (Serves 2)" className="itemImageThumb" src={SINGLE_IMAGE + menu.card.info.imageId} />
                            </div>
                        </div>
                    ))}
                    
                    
                </div>
            </div>
        </div>
    );
};
export default RestaurantsMenu;