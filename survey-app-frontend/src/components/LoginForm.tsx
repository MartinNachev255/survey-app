import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import loginService from '../services/login';
import surveyService from '../services/surveys';
import { setUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedSurveyAppUser', JSON.stringify(user));
      surveyService.setToken(user.token);
      dispatch(setUser(user));
      navigate('/surveys');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
