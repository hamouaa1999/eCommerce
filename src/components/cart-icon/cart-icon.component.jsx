import React from 'react';
import {connect} from "react-redux";
import {cartToggleHidden} from "../../redux/cart/cart.actions";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-icon.svg';
import './cart-icon.styles.scss';

const CartIcon = ({cartToggleHidden, itemCount}) => (
    <div className='cart-icon' onClick={cartToggleHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    cartToggleHidden: (state) => (dispatch(cartToggleHidden(state.hidden)))
});
const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
