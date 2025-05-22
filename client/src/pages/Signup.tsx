import { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const SignUp: any = () => {
    const [ userData, setUserData ] = useState({});

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { id, value } = event.target;
            setUserData({ ...userData, [id]:value });
    };

    const handleSubmit = async () => {

        try {
            const { data } = await addUser({
                variables: { ...userData }
            });

            console.log('new User: ',data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <div id='loginOrSignUp'>
        <h1>Welcome to MindSpace</h1>
        <h2>Please <a href="#email_login">Login</a> or <a href="#username_signUp">Sign Up</a></h2>

        <div>
            <div>
                <h2>Login</h2>
                <label htmlFor="email_login">email</label>
                <input onChange={handleChange} id="email_login" placeholder="test@test.com" />
                <label htmlFor="password_login">password</label>
                <input onChange={handleChange} id="password_login" type="password" placeholder="*******" />
                <button onClick={handleSubmit}>submit</button>
            </div>
            <div>
                <h2>Sign Up</h2>
                <label htmlFor="username_signUp">username</label>
                <input onChange={handleChange} id="username_signUp" placeholder="Noel" />
                <label htmlFor="email_signUp">email</label>
                <input onChange={handleChange} id="email_signUp" placeholder="test@test.com" />
                <label htmlFor="password_signUp">password</label>
                <input onChange={handleChange} id="password_signUp" type="password" placeholder="*******" />
                <label htmlFor="confirm_signUp">confirm</label>
                <input onChange={handleChange} id="confirm_signUp" type="password" placeholder="*******" />
                <button onClick={handleSubmit}>submit</button>
            </div>
        </div>

    
    </div>)
};

export default SignUp;