import { SINGLE_IMAGE } from '../utils/constents';
import vegImg from '../images/veg.png';
import nonVegImg from '../images/non-veg.png';
import { useDispatch } from 'react-redux';
import { removeItem } from '../utils/cartSlice';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
const CartItems = ({items}) => {

    const dispatch = useDispatch();
    const handleRemoveItems = (item, index) => {
        dispatch(removeItem(item, index));
    };

    return(
        <>
        {items.map((item, index)=> (
            <div className="flex justify-between items-start mb-9 mt-3 pb-9 border-b  dark:border-slate-700" key={item?.card?.info?.id}>
                <div className="order-2 sm:order-1 w-full pl-2 sm:pl-0 sm:w-4/5 pr-0 sm:pr-9 relative">
                    <img className="w-4" src={item?.card?.info?.isVeg ? vegImg : nonVegImg} alt={item?.card?.info?.isVeg ? 'Veg' : 'Non-Veg'} />                               
                    <h4 className="font-semibold text-sm sm:text-xl text-stone-600 dark:text-slate-300 my-1">{item?.card?.info?.name}</h4>
                    <p className="mb-4">
                        <span className="font-semibold text-md text-rose-500 my-1">₹{item?.card?.info?.defaultPrice / 100 || item?.card?.info?.price / 100}</span>
                    </p>
                    <button className="block sm:hidden text-white text-sm sm:text-base font-bold rounded-full absolute top-0 right-0" type="button" onClick={()=> handleRemoveItems(item, index)}
                    ><ClearOutlinedIcon className="text-red-600 dark:text-red-400 dark:hover:text-red-600 hover:text-red-700" />
                    </button>
                </div>
                <div className="order-1 sm:order-2 sm:w-1/5 relative flex justify-between items-center">
                    <img alt={item?.card?.info?.name} className="rounded-xl w-[80px] h-[80px] object-cover" src={SINGLE_IMAGE + item?.card?.info?.imageId} />
                    <button className="hidden sm:block text-white text-sm sm:text-base font-bold rounded-full" type="button" onClick={()=> handleRemoveItems(item, index)}
                    ><ClearOutlinedIcon className="text-red-600 dark:text-red-400 dark:hover:text-red-600 hover:text-red-700" />
                    </button>
                </div>
            </div>
        ))}
        </>
    );
}
export default CartItems;