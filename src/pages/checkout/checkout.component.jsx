import React from 'react';
import './checkout.styles.scss';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectCartItems, selectCartItemsTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const CheckoutPage = ({cartItems, cartItemsTotal}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>
                    Product
                </span>
            </div>
            <div className='header-block'>
                <span>
                    Description
                </span>
            </div>
            <div className='header-block'>
                <span>
                    Quantity
                </span>
            </div>
            <div className='header-block'>
                <span>
                    Price
                </span>
            </div>
            <div className='header-block'>
                <span>
                    Remove
                </span>
            </div>
        </div>
        {
            cartItems.map(
                cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )
        }
        <span className='total'>TOTAL: ${cartItemsTotal} </span>
    </div>
)
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotal: selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage);