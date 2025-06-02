
import{Link} from 'react-router-dom'
import{ useState, FormEvent, ChangeEvent } from 'react'
import './signup.css'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [addUser, { error }] = useMutation(ADD_USER);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          const { data } = await addUser({
            variables: { ...formState },
          });
    
          if (data) {
            Auth.login(data.login.token);
          }
        } catch (err) {
          console.error('Login error:', err);
        }
      };
  return (
    <div>
      <div id="loginOrSignUp">
        <h1>Welcome to MindSpace</h1>
        <h2>
          Please <Link to="/login">Login</Link> or <Link to="//signUp">Sign Up</Link>
        </h2>

        <div>
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>Signup failed.</p>}
      </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
