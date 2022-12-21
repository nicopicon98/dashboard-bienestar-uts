import axios from 'axios';

export const getSingleSchedule = () => {
  return axios.get("https://webservice.calendario")
}