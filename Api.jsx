import axios from 'axios';

const API_URL = 'http://localhost:8080/create'; // Backend URL for user registration

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

