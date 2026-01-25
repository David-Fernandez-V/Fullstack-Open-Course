import axios from "axios"

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (city) => {
    const request = axios.get(`${BASE_URL}q=${city}&appid=${api_key}&units=metric`)
    return request.then((response) => response.data)
}

export default {getWeather}