import axios from 'axios';
const request = axios.create({
  baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (q, options = {}) => {
  const result = await request.get(q, options);
  return result.data;
};
