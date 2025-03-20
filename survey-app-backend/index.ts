import app from './src/app';
import { PORT } from './src/config/env';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
