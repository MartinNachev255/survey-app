import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Paper,
  useTheme,
  Divider,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../utils/store';
import { ISurvey, IUser } from '../utils/types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeSurveys } from '../reducers/surveyReducer';

const HomePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  useEffect(() => {
    dispatch(initializeSurveys());
  }, [dispatch]);

  const surveys = useSelector<RootStore, ISurvey[]>((state) => state.surveys);

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

      {/* --- Surveys Section --- */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
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
        <Paper
          sx={{
            pb: 2.5,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{ pt: 1 }}
          >
            Available Surveys
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {surveys.length > 0 ? (
            <Stack spacing={3} sx={{}}>
              {surveys.map((survey) => (
                <Card
                  key={survey.id}
                  variant="outlined"
                  sx={{
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: `0 1px 4px 0 ${theme.palette.primary.dark}`,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      paddingBottom: '16px !important',
                      position: 'relative',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{
                          display: 'block',
                          mb: 1,
                          fontWeight: 'medium',
                        }}
                      >
                        {survey.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5 }}
                      >
                        survey.description
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                      >
                        {survey.questions.length} Questions
                      </Typography>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to={`/survey/${survey.id}/stats`}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        component={RouterLink}
                        to={`/survey/${survey.id}`}
                        disabled={user ? false : true}
                      >
                        Take Survey
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              fontSize={18}
              fontWeight={700}
              sx={{}}
            >
              No surveys available at the moment. Check back later or create
              one!
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
