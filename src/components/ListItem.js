import { SINGLE_IMAGE } from '../utils/constents';
import vegImg from '../images/veg.png';
import nonVegImg from '../images/non-veg.png';

const ListItem = ({items})=> {

    return(
        <>
            {items.map((item)=> (
                <div className="flex justify-between items-start mb-9 mt-3 pb-9 border-b  dark:border-slate-700" key={item?.card?.info?.id}>
                    <div className="order-2 sm:order-1 w-full pl-2 sm:pl-0 sm:w-4/5 pr-0 sm:pr-9">
                        <img className="w-4" src={item?.card?.info?.isVeg ? vegImg : nonVegImg} alt={item?.card?.info?.isVeg ? 'Veg' : 'Non-Veg'} />                               
                        <h4 className="font-semibold text-sm sm:text-xl text-stone-600 dark:text-slate-300 my-1">{item?.card?.info?.name}</h4>
                        <span className="font-semibold text-md text-rose-500 my-1">₹{item?.card?.info?.defaultPrice / 100 || item.card.info.price / 100}</span>
                        <p className="text-stone-500 dark:text-slate-300 text-xs sm:text-sm mt-2 mb-3">{item?.card?.info?.description}</p>
                        <button className="bg-rose-400 text-white text-sm sm:text-base font-bold px-4 sm:px-2 w-auto sm:w-[140px] md:w-1/4 py-2 rounded-md" type="button">Add to cart</button>
                    </div>
                    <div className="order-1 sm:order-2 w-[100px] sm:w-1/5 relative">
                        <img alt={item.card.info.name} className="rounded-xl w-[100px] sm:w-auto aspect-square object-cover" src={SINGLE_IMAGE + item?.card?.info?.imageId} />
                        
                    </div>
                </div>
            ))}
        </>
    );

}
export default ListItem;