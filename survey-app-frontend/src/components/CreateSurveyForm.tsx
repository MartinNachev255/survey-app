import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import surveyService from '../services/surveys';
import { IQuestion } from '../utils/types';

const CreateSurveyForm = () => {
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '40vw',
        margin: 'auto',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
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
        <Box
          key={index}
          padding={2}
          marginY={1}
          borderRadius={4}
          boxShadow={1}
          border="1px solid #ccc"
        >
          <TextField
            label="Question"
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop={2}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                const newQuestions = [...questions];
                newQuestions.splice(index, 1);
                setQuestions(newQuestions);
              }}
            >
              Remove Question
            </Button>
            <Button
              variant="contained"
              disabled={question.answers.length > 3}
              color="primary"
              onClick={() => {
                const newQuestions = [...questions];
                newQuestions[index].answers = newQuestions[
                  index
                ].answers?.concat({ answerText: '' });
                setQuestions(newQuestions);
              }}
            >
              Add answer
            </Button>
          </Box>
          {question.answers.map((answer, aIndex) => (
            <Box
              key={aIndex}
              padding={1}
              marginY={1}
              border="1px solid #ccc"
              borderRadius={1}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextField
                label="Answer"
                name={`answer-${aIndex}`}
                value={answer.answerText}
                required
                fullWidth
                sx={{ maxWidth: '50%' }}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].answers[aIndex].answerText =
                    e.target.value;
                  setQuestions(newQuestions);
                }}
              />
              <Button
                variant="contained"
                color="error"
                sx={{ margin: 'auto' }}
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions[index].answers.splice(aIndex, 1);
                  setQuestions(newQuestions);
                }}
              >
                Remove Answer
              </Button>
            </Box>
          ))}
        </Box>
      ))}
      <Button
        variant="contained"
        disabled={questions.length > 15}
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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CreateSurveyForm;
