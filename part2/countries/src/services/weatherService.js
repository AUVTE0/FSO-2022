import axios from 'axios'
const key = process.env.REACT_APP_API_KEY

const get = ([lat, lon]) => {
    console.log(key)
    const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    return req.then(res => res.data)
}

const weatherService = {get}

export default weatherService