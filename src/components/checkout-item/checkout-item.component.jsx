import React from 'react';
import connect from "react-redux";
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={`${cartItem.imageUrl}`} alt="item"/>
        </div>
        <span className='name'>{cartItem.name}</span>
        <span className='quantity'>
            <span>
                &#10094;
            </span>
            {cartItem.quantity}
            <span>
                &#10095;
            </span>
        </span>
        <span className='price'>{cartItem.price}</span>
        <div className='remove-button'>&#10006;</div>
    </div>
)

export default CheckoutItem;