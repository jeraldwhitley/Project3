import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

// Define the shape of the login response
interface LoginResponse {
  login: {
    token: string;
    user: {
      _id: string;
      username: string;
      email: string;
    };
  };
}

// Define the shape of the form state
interface FormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ email: '', password: '' });

  const [login, { error }] = useMutation<LoginResponse>(LOGIN);

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
      const { data } = await login({
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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>Login failed.</p>}
      </form>
    </div>
  );
};

export default Login;
