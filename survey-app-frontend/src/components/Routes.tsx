import { Routes, Route } from 'react-router';
import Surveys from './Surveys';
import LoginForm from './LoginForm';
import HomePage from './HomePage';

const RoutesComponent = () => {
  const PageNotFound = () => {
    return <div>PAGE NOT FOUND: 404</div>;
  };

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/surveys" element={<Surveys />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default RoutesComponent;
