import React from 'react';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import './cart-dropdown.styles.scss';
import {cartToggleHidden} from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))
            }
        </div>
        <CustomButton onClick={
            () => {
                history.push('/checkout');
                dispatch(cartToggleHidden());
            }

        }>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown));