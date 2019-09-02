import {cartActions} from './cart.types';
import addCartItems from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_CART_HIDDEN':
            return {
                ...state,
                hidden: !state.hidden
            }
        case cartActions.ADD_ITEM:
            return {
                ...state,
                cartItems: addCartItems(state.cartItems, action.payload)
            }
        default:
            return state
    }
}
export default cartReducer;