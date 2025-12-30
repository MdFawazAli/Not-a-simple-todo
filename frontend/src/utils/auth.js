// Utility functions for managing authentication tokens in localStorage

const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

const getToken = () => {
  return localStorage.getItem('authToken');
};

const removeToken = () => {
  localStorage.removeItem('authToken');
};

export { saveToken, getToken, removeToken };