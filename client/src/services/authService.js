import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const register = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/register`,
      {
        firstName,
        lastName,
        email,
        password,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};


export const AuthService = {
  register,
  login
};
