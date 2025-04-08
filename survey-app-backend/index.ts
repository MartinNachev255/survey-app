import app from './src/app';
import { PORT } from './src/config/env';
import logger from './src/config/logger';

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
