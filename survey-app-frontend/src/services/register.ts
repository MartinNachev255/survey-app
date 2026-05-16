const baseUrl = '/api/users';

interface Credentials {
  username: string;
  name: string;
  password: string;
}

const register = async (credentials: Credentials) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: data,
      },
    };
  }

  return data;
};

export default { register };
