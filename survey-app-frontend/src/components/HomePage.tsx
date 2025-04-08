import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  Button,
} from '@mui/material';
import SurveyList from './SurveysList';
import { RootStore } from '../utils/store';
import { useSelector } from 'react-redux';
import { IUser } from '../utils/types';
import { Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';

const HomePage = () => {
  const theme = useTheme();

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  return (
    <Box>
      <Paper
        square
        elevation={1}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          pt: 6,
          pb: 4,
          mb: 5,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'medium' }}
          >
            Full-Stack Survey Application
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: '90%', margin: 'auto' }}
          >
            This project demonstrates a full-stack web application built using
            React, Node.js, Express, MongoDB, Redux, Material UI, and
            TypeScript. It features user authentication, survey creation,
            response collection, and results visualization. Feel free to explore
            the available surveys or create an account to test the creation
            features.
          </Typography>
        </Container>
      </Paper>
      {user ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            component={RouterLink}
            to={'/survey/create'}
          >
            Create Survey
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button variant="contained" component={RouterLink} to={'/login'}>
            Login to create Survey
          </Button>
        </Box>
      )}
      <SurveyList />
    </Box>
  );
};

export default HomePage;
