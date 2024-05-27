
import axios from './axios';

export const registerLandlord = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post('api/landlord/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const registerTenant = async (userData) => {
    try {
      const response = await axios.post('api/tenant/register', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
export const loginLandlord = async (userData) => {
    try {
      const response = await axios.post('api/landlord/login', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  export const loginTenant = async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post('api/tenant/login', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
