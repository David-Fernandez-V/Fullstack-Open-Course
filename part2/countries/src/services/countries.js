import axios from "axios"

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
    const request = axios.get(`${BASE_URL}/all`)
    return request.then((response) => response.data);
}

export default {getAll}