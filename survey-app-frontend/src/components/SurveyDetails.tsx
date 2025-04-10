import { useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../utils/store';
import { ISurvey } from '../utils/types';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeSurveys } from '../reducers/surveyReducer';

const SurveyDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const surveyID = useParams().id;
  const surveys = useSelector<RootStore, ISurvey[]>((state) => state.surveys);

  useEffect(() => {
    if (surveys.length === 0) {
      dispatch(initializeSurveys());
    }
  }, [dispatch, surveys.length]);

  const survey = surveys.find((s) => s.id === surveyID);

  return (
    <Container>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        pt={{ xs: 2, sm: 3, md: '3vh', lg: '3vh' }}
        pb={3}
        mx={{ xs: 2, sm: 4, md: '20vh', lg: '35vh' }}
      >
        <Typography variant="h3" textAlign="center">
          {survey?.title}
        </Typography>
      </Box>
      <Divider />
      <Box my={2}>
        {survey?.questions.map((question, qIndex) => (
          <List key={qIndex}>
            <Typography
              variant="body1"
              fontWeight={650}
              mx={{ xs: 2, sm: 4, md: '10vh', lg: '10vh' }}
            >
              {question.question}
            </Typography>
            <Box
              sx={{
                pl: { xs: 2, sm: 4, md: 8, lg: 10 },
                mx: { xs: 1, sm: 2, md: '5vh', lg: '5vh' },
              }}
            >
              {[...question.answers]
                .sort((a, b) => (b.timesAnswered ?? 0) - (a.timesAnswered ?? 0))
                .map((answer, aIndex) => (
                  <List key={aIndex}>
                    <Typography variant="body1">
                      {aIndex}. {answer.answerText}: Has been answered{' '}
                      {answer.timesAnswered} times.
                    </Typography>
                  </List>
                ))}
            </Box>
          </List>
        ))}
        <Box
          display="flex"
          justifyContent="flex-start"
          mt={{ xs: 2.5, sm: 3, md: 5, lg: 5 }}
          pl={{ xs: 2, sm: 3, md: '11vh', lg: '11vh' }}
        >
          <Button variant="contained" onClick={() => navigate('/')}>
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SurveyDetails;
