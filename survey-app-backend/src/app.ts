import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  console.log('test')
  res.send('works')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
