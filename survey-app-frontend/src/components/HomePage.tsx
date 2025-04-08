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
            Site description
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            align="center"
            sx={{ maxWidth: '75%', margin: 'auto' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            libero dui, euismod sodales metus laoreet, blandit tincidunt leo.
            Praesent eu risus accumsan, condimentum tellus ut, dictum felis.
          </Typography>
        </Container>
      </Paper>
      {user ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            component={RouterLink}
            to={'/createsurvey'}
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
