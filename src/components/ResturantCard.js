import { CDN_URL, SINGLE_IMAGE } from '../utils/constents';

const ResturantCard = (props) =>{ 

    const { resData } = props;

    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla} = resData.info;

    return(
        <div className="res-card">
            <div className="res-card-thumb">
                <img alt="" src={CDN_URL + cloudinaryImageId}/>
                <div className="card-price">{costForTwo}</div>
            </div>
            <div className="res-content">
                <h3>{name}</h3>
                <p>{avgRating} star <span className="delevery-time">{sla.slaString}</span></p>
                <div className="sw-restaurant-card-descriptions-container d-flex justify-content-between flex-column">
                    <div className="cuisine">{cuisines.join(', ')}</div>                    
                </div>
            </div>
        </div>
    );
};

export default ResturantCard;