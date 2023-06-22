import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_YeUVvgaYAmZbS0p3RUp7cClenFfbzsyEDA7uMTq8afbwjESSe6lyJaSaCy2wO9b4';

const fetchBreeds = () => {
  const url = `${BASE_URL}/breeds`;
  return axios
    .get(url, { headers: { 'x-api-key': API_KEY } })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
};

const fetchCatByBreed = breedId => {
  const url = `${BASE_URL}/images/search?breed_id=${breedId}`;
  return axios
    .get(url, { headers: { 'x-api-key': API_KEY } })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
};

export { fetchBreeds, fetchCatByBreed };
