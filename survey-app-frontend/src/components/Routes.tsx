import { Routes, Route } from 'react-router';
import LoginForm from './LoginForm';
import HomePage from './HomePage';

const RoutesComponent = () => {
  const PageNotFound = () => {
    return <div>PAGE NOT FOUND: 404</div>;
  };

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default RoutesComponent;
