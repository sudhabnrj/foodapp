import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        item: [],
    },
    reducers: {
        addItem: (state = null, action) => {
            state.item.push(action.payload);
        },
        removeItem: (state, action)=> {
            state.item.splice(action.payload, 1);
        },
        clearCart: (state)=>{
            state.item.length = 0;
        }
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;