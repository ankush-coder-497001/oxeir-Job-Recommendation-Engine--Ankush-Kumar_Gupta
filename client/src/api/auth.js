import api from './axiosConfig';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    // Store auth data
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.userId);
    localStorage.setItem('userRole', response.role);
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Store auth data after successful registration
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userRole', response.role);
    }
    return response;
  } catch (error) {
    // Log the error for debugging
    console.error('Registration error:', error.response || error);
    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
};
