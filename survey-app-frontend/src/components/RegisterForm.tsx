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
import registerService from '../services/register';
import surveyService from '../services/surveys';
import { setUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { IUser } from '../utils/types';
import { RootStore } from '../utils/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  // Redirect to homepage if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
      if (username.length < 3) {
        throw new Error('Username has to be at least 3 characters');
      }
      if (password.length < 3) {
        throw new Error('Password has to be at least 3 characters');
      }
      if (name.length < 3) {
        throw new Error('Name has to be at least 3 characters');
      }
      const user = await registerService.register({
        username,
        name,
        password,
      });
      window.localStorage.setItem('loggedSurveyAppUser', JSON.stringify(user));
      surveyService.setToken(user.token);
      dispatch(setUser(user));
      navigate('/');
    } catch (exception: unknown) {
      let errorMessage =
        exception instanceof Error ? exception.message : 'An error occurred';
      if (
        exception &&
        typeof exception === 'object' &&
        'response' in exception
      ) {
        const axiosError = exception as {
          response: {
            data: {
              keyValue?: object | undefined;
              message: string;
            };
          };
        };
        if (
          axiosError.response.data.message.includes('Duplicate key') &&
          axiosError.response.data.keyValue
        ) {
          // Check for specific MongoDB duplicate key error and extract the field name
          const duplicateKey = Object.keys(
            axiosError.response.data.keyValue,
          ).toString();
          errorMessage = `${duplicateKey} already exists`;
        } else {
          errorMessage = axiosError.response.data.message;
        }
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
        Sign up
      </Typography>
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
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="username"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          required
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
            to={'/login'}
            variant="body1"
            color="text.primary"
          >
            Click to Sign in
          </MUILink>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
