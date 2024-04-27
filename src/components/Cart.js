import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { clearCart } from '../utils/cartSlice';
const Cart = () => {

    const cartItems = useSelector((store)=> store.cart.item);
    //console.log(cartItems);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
        //console.log("clear cart");
    };

    let cartTotalPrice = cartItems.reduce((acc, curr) => {
        let price = curr?.card?.info?.price ? curr?.card?.info?.price : curr?.card?.info?.defaultPrice;
        acc += price; 
        //console.log(acc);
        return acc;
       
    }, 0);

    return(
        <div className="h-screen">
            <div className="container mx-auto px-4 lg:px-0">
                <h1 className="text-3xl font-bold mb-3 mt-10">Cart({cartItems.length})</h1>
                <div className="flex sm:flex-row flex-col justify-between items-start">
                    <div className="w-full sm:w-6/12">
                        <div className="p-0 mt-5">
                            {cartItems.length === 0 && 
                                <>
                                    <h1 className="py-2 px-5 bg-sky-100 dark:bg-slate-200 text-sky-600 dark:text-slate-700 rounded-lg font-medium">You have no items in your shopping cart.</h1>
                                    <div className="mt-5">
                                        <Link to='/' className="py-3 px-4 bg-red-400 rounded-lg mr-2 text-stone-50 font-medium">Go to Restuarents </Link>
                                    </div>
                                </>
                            }
                            <CartItems items={cartItems}/>
                        </div>
                    </div>
                    {cartItems.length !== 0 &&
                        <div className="w-full sm:w-5/12 lg:w-3/12">
                            <div className="bg-gray-200 dark:bg-slate-700 p-5 flex justify-center flex-col">
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-5">Bill Details</h3>
                                    <p className="flex justify-between items-start mb-3">
                                        <span>Item Total: </span>
                                        <span>₹{cartTotalPrice/100}</span>
                                    </p>
                                    <p className="flex justify-between items-start mb-3">
                                        <span>Delivery Fee: </span>
                                        <span>₹39</span>
                                    </p>
                                    <p className="flex justify-between items-start mb-3">
                                        <span>Platform fee: </span>
                                        <span>₹4</span>
                                    </p>
                                    <div className="border-t-2 border-gray-400 dark:border-slate-600">
                                        <p className="flex justify-between items-start mb-8 mt-3 text-black dark:text-slate-300 font-bold">
                                            <span>TO PAY</span>
                                            <span>₹{(cartTotalPrice / 100) + 39 + 4 }</span>
                                        </p>
                                    </div>
                                </div>
                                <button type="button" className="bg-red-400 py-2 px-5 text-white font-medium rounded-md"
                                onClick={handleClearCart}
                                >
                                    Clear Cart <DeleteOutlineOutlinedIcon/>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;