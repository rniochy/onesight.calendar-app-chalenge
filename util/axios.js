import axios from 'axios'

const baseURL = process.env.BASE_URL;
const fetchData = axios.create({baseURL,});
export default fetchData;