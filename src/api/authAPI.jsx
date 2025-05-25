import axios from 'axios';

const API_URL = 'http://localhost:7000/api'; // Replace with your API endpoint

export const login = async (emailId, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { emailId, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (username, emailId, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {username, emailId, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
export const logout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  };