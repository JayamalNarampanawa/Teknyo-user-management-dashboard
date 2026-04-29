import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unable to fetch users right now.',
      { cause: error }
    );
  }
};