import { useSelector } from 'react-redux';
import { RootStore } from '../utils/store';
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

const SurveyDetails = () => {
  const navigate = useNavigate();

  const surveyID = useParams().id;
  const surveys = useSelector<RootStore, ISurvey[]>((state) => state.surveys);

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
      <Box my={1}>
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
                .sort((a, b) => b.timesAnswerd - a.timesAnswerd)
                .map((answer, aIndex) => (
                  <List key={aIndex}>
                    <Typography variant="body1">
                      {aIndex}. {answer.answerText}: Has been answerd{' '}
                      {answer.timesAnswerd} times.
                    </Typography>
                  </List>
                ))}
            </Box>
          </List>
        ))}
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={4}
          pr={{ xs: 5, sm: 8, md: '14vh', lg: '25vh' }}
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
