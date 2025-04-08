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
import { initializeSurveys } from '../reducers/surveyReducer';
import { AppDispatch, RootStore } from '../utils/store';
import { ISurvey, IUser } from '../utils/types';
import { Link as RouterLink } from 'react-router';

const SurveyList = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [filter, setFilter] = useState('');

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  useEffect(() => {
    dispatch(initializeSurveys());
  }, [dispatch]);

  const surveys = useSelector<RootStore, ISurvey[]>((state) => state.surveys);

  return (
    <Container maxWidth="md" sx={{ mb: 6, mt: 5 }}>
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
        {surveys.length > 0 ? (
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
