import React from 'react';
import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, SignInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have and account</h2>
                <span>Sign in with your e-mail and password</span>
                <form onSubmit={ async event => {
                    const {email, password} = this.state;
                    try {
                        event.preventDefault();
                        await auth.signInWithEmailAndPassword(email, password);
                        this.setState({
                            email: '',
                            password: ''
                        });
                    } catch (error) {
                        console.log(error);
                    }

                }
                }>
                    <FormInput
                        type='email'
                        name='email'
                        label='email'
                        value={this.state.email}
                        onChange={event => {
                            const {name, value} = event.target;
                            this.setState({[name]: value});
                        }}
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        handleChange={event => {
                            const {name, value} = event.target;
                            this.setState({[name]: value});
                        }}
                        label='password'
                    />
                    <div className='buttons'>
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={SignInWithGoogle} isGoogleSignIn >
                            {' '}
                            Sign In With Google{' '}
                        </CustomButton>
                    </div>


                </form>
            </div>
        )
    }
}

export default SignIn;
