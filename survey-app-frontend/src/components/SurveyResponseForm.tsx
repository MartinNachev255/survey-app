import { useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../utils/store';
import { AnswerSelection, ISurvey } from '../utils/types';
import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import surveyService from '../services/surveys';
import { useDispatch } from 'react-redux';
import { initializeSurveys } from '../reducers/surveyReducer';
import { useNotification } from '../hooks/useNotification';

const SurveyResponseForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showNotification } = useNotification();

  const surveyID = useParams().id;
  const surveys = useSelector<RootStore, ISurvey[]>((state) => state.surveys);

  useEffect(() => {
    if (surveys.length === 0) {
      dispatch(initializeSurveys());
    }
  }, [dispatch, surveys.length]);

  const survey = surveys.find((s) => s.id === surveyID);

  // State to track selected answers: [{ questionIndex, answerIndex }, ...]
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerSelection[]>([]);
  // State to prevent double submissions while API call is in progress
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    qIndex: number,
  ) => {
    const selectedAnswerIndex = parseInt(event.target.value, 10);
    setSelectedAnswers((prev) => {
      const existingEntryIndex = prev.findIndex(
        (entry) => entry.questionsIndex === qIndex,
      );
      // Create a copy of the previous state to avoid direct mutation
      const newState = [...prev];
      if (existingEntryIndex > -1) {
        // Update existing entry if found
        newState[existingEntryIndex] = {
          ...newState[existingEntryIndex],
          answersIndex: selectedAnswerIndex,
        };
      } else {
        // Add new entry if not found
        newState.push({
          questionsIndex: qIndex,
          answersIndex: selectedAnswerIndex,
        });
      }
      return newState; // Return the updated state array
    });
  };

  interface Result {
    success: boolean;
    modifiedContent: number;
  }
  const handleSubmit = async () => {
    if (surveyID && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const result: Result = await surveyService.submitAnswers(
          surveyID,
          selectedAnswers,
        );
        if (result) {
          showNotification('Survey successfully submitted');
          navigate(`/survey/${surveyID}/stats`);
        } else {
          setIsSubmitting(false);
        }
      } catch (error) {
        showNotification(
          `Error: ${error instanceof Error ? error.message : String(error)}`,
        );
        setIsSubmitting(false);
      }
    }
  };

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
      <Box mt={1} mb={8}>
        {survey?.questions.map((question, qIndex) => (
          <List key={qIndex}>
            <Typography
              variant="body1"
              fontWeight={650}
              mx={{ xs: 2, sm: 4, md: '10vh', lg: '10vh' }}
            >
              {question.question}
            </Typography>
            <Box>
              <FormControl
                sx={{
                  pl: { xs: 2, sm: 4, md: 8, lg: 10 },
                  mx: { xs: 1, sm: 2, md: '5vh', lg: '5vh' },
                }}
              >
                <RadioGroup
                  aria-label={`question-${qIndex}`}
                  name={`radio-buttons-group-${qIndex}`}
                  // Find the selected answer index for this question, default to '' if none
                  value={
                    selectedAnswers.find(
                      (entry) => entry.questionsIndex === qIndex,
                    )?.answersIndex ?? ''
                  }
                  onChange={(e) => handleRadioChange(e, qIndex)}
                >
                  {question.answers.map((answer, aIndex) => (
                    <FormControlLabel
                      key={aIndex}
                      value={aIndex}
                      control={<Radio />}
                      label={answer.answerText}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </List>
        ))}
        <Box
          display="flex"
          justifyContent="space-between"
          mt={4}
          pr={{ xs: 2, sm: 3, md: '11vh', lg: '11vh' }}
          pl={{ xs: 2, sm: 3, md: '11vh', lg: '11vh' }}
        >
          <Button variant="contained" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            // Disables button if form is being submitted or 
            // if not all question have been answered 
            disabled={isSubmitting || (selectedAnswers.length !== survey?.questions.length)}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SurveyResponseForm;
