import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import surveyService from '../services/surveys';
import { IQuestion } from '../utils/types';

const CreateSurveyForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      question: '',
      answers: [
        {
          answerText: '',
        },
      ],
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSurvey = {
      title: title,
      description: description,
      questions: questions,
    };
    await surveyService.createNewSurvey(newSurvey);
    console.log('Form Data:', questions);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '60%', lg: '40%' },
        margin: 'auto',
        mt: 4,
        mb: 4,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, sm: 2 },
          padding: { xs: 2, sm: 4 },
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 'medium',
            mb: 3,
          }}
        >
          Create Survey
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          required
          margin="normal"
        />

        {questions.map((question, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              padding: { xs: 2, sm: 3 },
              marginY: 2,
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TextField
                label={`Question ${index + 1}`}
                name={`question-${index}`}
                value={question.question}
                required
                fullWidth
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].question = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            </Box>

            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              gap={1}
              marginTop={2}
            >
              <Button
                variant="outlined"
                color="error"
                fullWidth={isMobile}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions.splice(index, 1);
                  setQuestions(newQuestions);
                }}
              >
                Remove Question
              </Button>
              <Button
                variant="outlined"
                disabled={question.answers.length > 3}
                color="primary"
                fullWidth={isMobile}
                startIcon={<AddIcon />}
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions[index].answers = newQuestions[
                    index
                  ].answers?.concat({ answerText: '' });
                  setQuestions(newQuestions);
                }}
              >
                Add Answer
              </Button>
            </Box>

            {question.answers.map((answer, aIndex) => (
              <Paper
                key={aIndex}
                variant="outlined"
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mt: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 1,
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <TextField
                  label="Answer"
                  name={`answer-${aIndex}`}
                  value={answer.answerText}
                  required
                  fullWidth
                  sx={{ maxWidth: { xs: '100%', sm: '50%' } }}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].answers[aIndex].answerText =
                      e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
                <Button
                  variant="text"
                  color="error"
                  fullWidth={isMobile}
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    const newQuestions = [...questions];
                    newQuestions[index].answers.splice(aIndex, 1);
                    setQuestions(newQuestions);
                  }}
                >
                  Remove
                </Button>
              </Paper>
            ))}
          </Paper>
        ))}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mt: 3,
            mb: 1,
          }}
        >
          <Button
            variant="outlined"
            disabled={questions.length > 15}
            fullWidth={isMobile}
            startIcon={<AddIcon />}
            onClick={() => {
              setQuestions(
                questions.concat({
                  question: '',
                  answers: [
                    {
                      answerText: '',
                    },
                  ],
                }),
              );
            }}
          >
            Add Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth={isMobile}
            sx={{
              height: 48,
              fontWeight: 'bold',
            }}
          >
            Submit Survey
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CreateSurveyForm;
