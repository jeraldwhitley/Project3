import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import './signup.css';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

interface FormState {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formState, setFormState] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [addUser, { error }] = useMutation(ADD_USER);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate('/newentry');
    }
  }, []);

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

      console.log('Signup response:', data);

      if (data?.addUser?.token) {
        Auth.login(data.addUser.token);
        navigate('/newentry'); // ✅ Redirect after signup
      } else {
        console.error('Signup failed — missing token:', data);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <div id="loginOrSignUp">
        <h1>Welcome to MindSpace</h1>
        <h2>
          Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
        </h2>

        <div>
          <div>
            <h1>Sign Up</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
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
              <button type="submit">Sign Up</button>
              {error && <p style={{ color: 'red' }}>Signup failed.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

