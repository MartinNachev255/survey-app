import ResponsiveAppBar from './components/ResponsiveAppBar';
import RoutesComponent from './components/Routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserFromLocalStorage } from './utils/loginUserLocalStorage';
import { RootStore } from './utils/store';
import { IUser } from './utils/types';
import { isTokenExpired } from './services/surveys';
import { clearUser } from './reducers/userReducer';
import Notification from './components/Notification';
import { useNotification } from './hooks/useNotification';

const App = () => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  useEffect(() => {
    if (!user) {
      loginUserFromLocalStorage(dispatch);
    } else {
      if (isTokenExpired()) {
        showNotification('Session expired');
        dispatch(clearUser());
        window.localStorage.removeItem('loggedSurveyAppUser');
      }
    }
  }, [dispatch, user]);

  return (
    <div>
      <ResponsiveAppBar />
      <RoutesComponent />
      <Notification />
    </div>
  );
};

export default App;
