import ResponsiveAppBar from './components/ResponsiveAppBar';
import RoutesComponent from './components/Routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserFromLocalStorage } from './utils/loginUserLocalStorage';
import { RootStore } from './utils/store';
import { IUser } from './utils/types';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector<RootStore, IUser | null>((state) => state.user);

  useEffect(() => {
    if (!user) {
      loginUserFromLocalStorage(dispatch);
    }
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <RoutesComponent />
    </div>
  );
};

export default App;
