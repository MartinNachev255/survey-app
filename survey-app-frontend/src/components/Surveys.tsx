import { useEffect } from 'react';
import { initializeSurveys } from '../reducers/surveyReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../utils/store';
import { loginUserFromLocalStorage } from '../utils/loginUserLocalStorage';
// import { List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import React from 'react';
// Core components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar'; // For initials/icons
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon'; // Often used to wrap Avatar/Icon for spacing
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Icons (make sure you have @mui/icons-material installed)
// npm install @mui/icons-material
import AssignmentIcon from '@mui/icons-material/Assignment'; // Another suitable icon
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Surveys = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    loginUserFromLocalStorage(dispatch, navigate);

    dispatch(initializeSurveys());
  }, [dispatch]);

  const surveys = useSelector((state: any) => state.surveys);

  return (
    // Outer Box to control centering and overall page layout
    <Box
      display="flex" // Enable Flexbox
      justifyContent="center" // Center horizontally
      alignItems="center" // Center vertically (optional, needs height)
      minHeight="80vh" // Give parent height for vertical centering
      sx={{ p: 2 }} // Add some padding around the centered content
    >
      {/* The Card acts as the main container for the list */}
      <Card
        raised
        sx={{
          minWidth: 300, // Ensure card doesn't get too small
          maxWidth: 600, // Control max width on larger screens
          width: '100%', // Allow shrinking but constrained by maxWidth
          borderRadius: 2, // Slightly more rounded corners (theme.shape.borderRadius * 2)
          boxShadow: 6, // More prominent shadow (theme.shadows[6])
        }}
      >
        <CardHeader
          avatar={
            // Avatar in the header for visual appeal
            <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="survey list">
              <AssignmentIcon />
            </Avatar>
          }
          title="Select a Survey"
          titleTypographyProps={{ variant: 'h6' }}
          // Add a subtle bottom border to the header
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        />

        <List disablePadding>
          {surveys.map((survey: any, index: number) => (
            <React.Fragment key={survey.id}>
              <ListItem disablePadding>
                {/* ListItemButton for better hover/focus/click feedback */}
                <ListItemButton
                  sx={{
                    // Custom hover effect
                    '&:hover': {
                      backgroundColor: 'action.hover', // Use theme's hover color
                    },
                    py: 1.5, // Increase vertical padding for better spacing
                  }}
                  // onClick={() => handleSurveyClick(survey.id)} // Add interaction logic
                >
                  <ListItemText
                    primary={survey.title}
                    // Make the primary text slightly bolder
                  />
                  {/* Chevron indicates interactivity */}
                  <ChevronRightIcon sx={{ color: 'action.active', ml: 1 }} />
                </ListItemButton>
              </ListItem>
              {/* Divider between items */}
              {index < surveys.length - 1 && (
                // Inset divider aligns nicely with text when using Avatar/Icon
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
        {/* Optional CardActions */}
        {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">Help</Button>
      </CardActions> */}
      </Card>
    </Box>
  );
};

export default Surveys;
