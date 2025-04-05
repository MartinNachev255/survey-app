import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Link as MuiLink, // Use MuiLink for consistency or regular Link
  Paper, // Use Paper for the header background
  useTheme, // To access theme colors for hover effects
  Button,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // Assuming React Router
import { useSelector } from 'react-redux';

const HomePage = () => {
  const theme = useTheme(); // Access theme for hover color

  const surveys = useSelector((state: any) => state.surveys);
  const user = useSelector((state: any) => state.user);

  return (
    <Box>
      <Paper
        square
        elevation={0.75}
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

      {/* --- Available Surveys Section --- */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        {user && (
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
        )}

        <Paper
          sx={{
            pb: 2.5,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom // Adds space below the heading
            align="center"
            sx={{ pt: 1 }} // More specific margin if needed
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
                      // Subtle hover effect for outlined card
                      borderColor: 'primary.main',
                      boxShadow: `0 1px 4px 0 ${theme.palette.primary.dark}`,
                    },
                  }}
                >
                  <CardContent sx={{ paddingBottom: '16px !important' }}>
                    <MuiLink
                      component={RouterLink}
                      to={`/survey/${survey.id}`} // Your survey route
                      underline="hover" // Show underline only on hover
                      variant="h6" // Use Typography variant for styling
                      color="text.primary" // Use primary text color, link will inherit hover from MuiLink
                      sx={{
                        display: 'block', // Make link block level for easier clicking
                        mb: 1, // Margin below title
                        fontWeight: 'medium',
                        '&:hover': {
                          // Optional: specific color on hover if default isn't enough
                          // color: 'primary.light'
                        },
                      }}
                    >
                      {survey.title}
                    </MuiLink>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.5 }}
                    >
                      {survey.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      {' '}
                      {/* Use div for block display */}
                      {survey.questionCount} Questions
                    </Typography>
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
