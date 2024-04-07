import { CDN_URL, SINGLE_IMAGE } from '../utils/constents';
import StarsIcon from '@mui/icons-material/Stars';

const ResturantCard = (props) =>{ 

    const { resData } = props;

    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla} = resData.info;

    return(
        <div className="w-full flex flex-col bg-stone-50 hover:bg-stone-100 h-full rounded-md drop-shadow hover:drop-shadow-xl transition-all">
            <div className="relative">
                <img className="aspect-video object-cover rounded-t-md" alt="" src={CDN_URL + cloudinaryImageId}/>
                <div className="absolute bottom-0 p-3 w-full font-black text-2xl 
                text-white uppercase bg-gradient-to-b from-[#1b1e2400] to-[#1b1e24]">{costForTwo}</div>
            </div>
            <div className="res-content p-4">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <p className="flex items-center">
                    <StarsIcon className="text-green-700 mr-1" /><span className="text-lg font-medium">{avgRating}</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span className="text-lg font-medium">{sla.slaString}</span>
                </p>
                <div className="flex flex-wrap text-wrap mt-4">
                    <div className="cuisine">{cuisines.join(', ')}</div>                    
                </div>
            </div>
        </div>
    );
};

export default ResturantCard;