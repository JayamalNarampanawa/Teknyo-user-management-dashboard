import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  try {
    // Pull the user list from the mock API that powers the dashboard demo.
    const response = await axios.get(API_URL, {
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    // Re-throw a friendlier message so the UI can explain the failure clearly.
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to fetch users right now.",
      { cause: error },
    );
  }
};
