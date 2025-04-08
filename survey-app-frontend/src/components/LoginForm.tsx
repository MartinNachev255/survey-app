import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MUILink,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import loginService from '../services/login';
import surveyService from '../services/surveys';
import { setUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { IUser } from '../utils/types';
import { RootStore } from '../utils/store';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      navigate('/');
    } catch (exception) {
      //TODO replace
      console.log(exception);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="90vh"
      p={2}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ width: '100%', maxWidth: 400, mt: 1 }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Box display="flex" justifyContent="center" width="100%">
          <MUILink
            component={RouterLink}
            underline="hover"
            to={'/register'}
            variant="body1"
            color="text.primary"
          >
            Click to Sign up
          </MUILink>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
