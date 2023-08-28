import axios from 'axios';

export const getSearchData = async (value: string) => {
  const apiKey = process.env.REACT_APP_SEARCH_API_CODE;
  const response = await axios.get(`https://us1.locationiq.com/v1/search.php?format=json&key=${apiKey}&q=${value}`);
  return response.data.slice(0, 1);
};
