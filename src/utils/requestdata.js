import axios from 'axios';

export const requestData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('bError fetching data:', error);
    throw error;
  }
};