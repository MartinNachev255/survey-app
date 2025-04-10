import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link as MUILink,
  InputAdornment,
  IconButton,
  Paper,
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
import { useNotification } from '../hooks/useNotification';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

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

  const [invalidCredentialsNotif, setInvalidCredentialsNotif] = useState('');

  const displayInvalidCredentialsNotif = (message: string) => {
    setInvalidCredentialsNotif(message);
    setTimeout(() => {
      setInvalidCredentialsNotif('');
    }, 5000);
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
      showNotification('Successfully logged in');
    } catch (exception: unknown) {
      let errorMessage =
        exception instanceof Error ? exception.message : 'An error occurred';
      if (
        exception &&
        typeof exception === 'object' &&
        'response' in exception
      ) {
        const axiosError = exception as {
          response: { data: { message: string } };
        };
        errorMessage = axiosError.response.data.message;
      }
      displayInvalidCredentialsNotif(errorMessage);
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
        {invalidCredentialsNotif && (
          <Box>
            <Paper elevation={1}>
              <Typography
                color="error"
                align="center"
                sx={{ p: { sx: 1, md: 2, lg: 2 } }}
                border={'1px solid rgba(255, 0, 0, 0.7)'}
                borderRadius={2}
              >
                {invalidCredentialsNotif}
              </Typography>
            </Paper>
          </Box>
        )}
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
