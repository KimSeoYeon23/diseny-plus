import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '48be3917f318b224fb1a58382847ccba',
    language: 'ko-KR',
  },
});

export default instance;
