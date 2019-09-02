import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import './header.styles.scss';


const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
                : <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            }
            <CartIcon />
            {
                hidden ? null : <CartDropdown />
            }
        </div>
    </div>
)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);