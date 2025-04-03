import { Button } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { useSelector } from 'react-redux';
import RoutesComponent from './components/Routes';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <RoutesComponent />
      Hello
      {/* <Surveys /> */}
      {/* <LoginForm /> */}
      <Button onClick={() => console.log(user)}>Button</Button>
    </div>
  );
};

export default App;
