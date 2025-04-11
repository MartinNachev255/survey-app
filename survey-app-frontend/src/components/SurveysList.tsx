import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { initializeSurveys, removeSurvey } from '../reducers/surveyReducer';
import { AppDispatch, RootStore } from '../utils/store';
import { ISurvey, IUser } from '../utils/types';
import { Link as RouterLink } from 'react-router';
import surveyService from '../services/surveys';
import { useNotification } from '../hooks/useNotification';

const SurveyList = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { showNotification } = useNotification();

  const [filter, setFilter] = useState('');

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  useEffect(() => {
    dispatch(initializeSurveys());
  }, [dispatch]);

  const surveys = useSelector<RootStore, ISurvey[]>((state) => state.surveys);

  const handleDelete = async (surveyID: string) => {
    if (confirm('Are you sure you want to delete the survey?')) {
      await surveyService.deleteSurvey(surveyID);
      dispatch(removeSurvey(surveyID));
      showNotification('Survey deleted');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 6, mt: 5 }}>
      <Paper
        sx={{
          pb: 2.5,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          align="center"
          sx={{ pt: 1 }}
        >
          Available Surveys
        </Typography>
        <TextField
          label="Filter surveys"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            mb: 2,
            mt: 2,
            ml: 'auto',
            mr: 'auto',
            width: '33%',
            display: 'flex',
          }}
        />
        <Divider sx={{ mb: 3 }} />
        {Array.isArray(surveys) && surveys.length > 0 ? (
          <Stack spacing={3} sx={{}}>
            {surveys
              .filter((survey) =>
                survey.title.toLowerCase().includes(filter.toLowerCase()),
              )
              .map((survey) => (
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
                      <Stack direction="column">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{
                              display: 'block',
                              mb: 0,
                              fontWeight: 'medium',
                            }}
                          >
                            {survey.title}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            {survey.author ? `by ${survey.author}` : null}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5 }}
                      >
                        {survey.description || 'No description'}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                      >
                        Questions: {survey.questions.length}
                      </Typography>
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                      {/* Show delete button only if the logged-in user is the author */}
                      {survey.author === user?.name && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          sx={{ mr: 1 }}
                          onClick={() => handleDelete(survey.id)}
                        >
                          Delete
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        size="small"
                        component={RouterLink}
                        to={`/survey/${survey.id}/stats`}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      {/* Disable button and show tooltip if user is not logged in */}
                      <Tooltip title={!user ? 'Login to take survey' : ''}>
                        <RouterLink
                          to={`/survey/${survey.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            disabled={user ? false : true}
                          >
                            Take Survey
                          </Button>
                        </RouterLink>
                      </Tooltip>
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
            No surveys available at the moment. Check back later or create one!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SurveyList;
