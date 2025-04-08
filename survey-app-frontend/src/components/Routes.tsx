import { Routes, Route } from 'react-router';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import SurveyResponseForm from './SurveyResponseForm';
import SurveyDetails from './SurveyDetails';
import RegisterForm from './RegisterForm';

const RoutesComponent = () => {
  const PageNotFound = () => {
    return <div>PAGE NOT FOUND: 404</div>;
  };

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/survey/:id" element={<SurveyResponseForm />} />
      <Route path="/survey/:id/stats" element={<SurveyDetails />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
};

export default RoutesComponent;
