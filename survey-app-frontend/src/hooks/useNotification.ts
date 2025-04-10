import { useDispatch } from 'react-redux';
import {
  clearNotificationMsg,
  setNotificationMsg,
} from '../reducers/notificationReducer';
import { AppDispatch } from '../utils/store';

export const useNotification = () => {
  const dispatch = useDispatch<AppDispatch>();

  const showNotification = (message: string, duration = 6000) => {
    dispatch(setNotificationMsg(message));

    setTimeout(() => {
      dispatch(clearNotificationMsg());
    }, duration);
  };

  return { showNotification };
};
