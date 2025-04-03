import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/survey';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAllSurveys = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.get(baseUrl, config);
  return res.data;
};

const deleteSurvey = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const req = await axios.delete(`${baseUrl}/${id}`, config);
  return req.data;
};

export default { setToken, getAllSurveys, deleteSurvey };
