import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users`, normalizedUser);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const edit = async (user_id, normalizedUser) => {
  try {
    const { data } = await axios.put(`${apiUrl}/users/${user_id}`, normalizedUser);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export const getUser = async (user_id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/${user_id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/users/`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export const deleteUser = async (userId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export const businessUser = async (userId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
}