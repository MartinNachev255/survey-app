import axios from 'axios';

const baseUrl = '/api/users';

interface Credentials {
  username: string;
  name: string;
  password: string;
}

const register = async (credentials: Credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default { register };
