import api from './axiosConfig';

export const getRecommendedJobs = async () => {
  try {
    const response = await api.get('/jobs/recommend-jobs');
    return response;
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await api.post('/employers/create-job', jobData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEmployerJobs = async () => {
  try {
    const response = await api.get('/employers/jobs');
    return response;
  } catch (error) {
    throw error;
  }
};

