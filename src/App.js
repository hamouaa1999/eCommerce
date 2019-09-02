import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from "react-redux";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {setCurrentUser} from './redux/user/user.actions';
import './App.css';
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            const userRef = await createUserProfileDocument(userAuth);
            if (userAuth) {
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                });
            }
            setCurrentUser(userAuth);
        });
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route exact path='/signin' render={() => this.props.currentUser ? (
                        <Redirect to='/'/>
                    ) : (
                        <SignInAndSignUpPage />
                    )
                    }
                    />
                    <Route exact path='/checkout' component={CheckoutPage} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
