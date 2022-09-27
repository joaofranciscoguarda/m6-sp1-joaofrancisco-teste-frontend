import axios from 'axios';

const api = axios.create({
  baseURL: 'https://teste-tecnico-joaof-backend.herokuapp.com/api/',
});

export default api;
