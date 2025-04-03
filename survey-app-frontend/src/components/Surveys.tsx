import { useEffect } from 'react';
import { initializeSurveys } from '../reducers/surveyReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../utils/store';

const Surveys = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeSurveys());
  }, [dispatch]);

  const surveys = useSelector((state: any) => state.surveys);

  console.log('surveys!', surveys);
  return <div></div>;
};

export default Surveys;
