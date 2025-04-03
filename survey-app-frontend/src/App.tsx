import { Button } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { useSelector } from 'react-redux';
import RoutesComponent from './components/Routes';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserFromLocalStorage } from './utils/loginUserLocalStorage';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    loginUserFromLocalStorage(dispatch, navigate);
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
