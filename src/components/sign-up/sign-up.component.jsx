import React from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }
    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign Up with your Email and Password</span>
                <form className='sign-up-form' onSubmit={async event => {
                    event.preventDefault();
                    const { displayName, email, password, confirmPassword } = this.state;
                    if (password !== confirmPassword) {
                        alert("please verify your password.");
                        return;
                    }
                    try {
                        const { user } = await auth.createUserWithEmailAndPassword(email, password);
                        await createUserProfileDocument(user, {displayName});
                        this.setState({
                            displayName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        })
                    } catch (error) {
                        console.log("Error ", error.message);
                    }
                }}>
                    <FormInput
                        name='displayName'
                        type='text'
                        value={displayName}
                        onChange={event => {
                            const {name, value} = event.target;
                            this.setState({
                                [name]: value
                            })
                        }}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        name='email'
                        type='email'
                        value={email}
                        onChange={event => {
                            const {name, value} = event.target;
                            this.setState({
                                [name]: value
                            })
                        }}
                        label='Email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        onChange={event => {
                            const {name, value} = event.target;
                            this.setState({
                                [name]: value
                            })
                        }}
                        label='Password'
                        required
                    />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        onChange={event => {
                            const {name, value} = event.target;
                            this.setState({
                                [name]: value
                            })
                        }}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit' >
                        SIGN UP
                    </CustomButton>
                </form>

            </div>
        )
    }
}

export default SignUp;