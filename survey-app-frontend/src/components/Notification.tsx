import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootStore } from '../utils/store';

const Notification = () => {
  const message = useSelector<RootStore, string>((state) => state.notification);

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={message.includes('Error: ') ? 'error' : 'success'}
        sx={{ width: '100%' }}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
