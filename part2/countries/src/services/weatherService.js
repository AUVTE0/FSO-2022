import axios from 'axios'
const key = "771565397ab9d20a6e501929790c4dc4"

const get = ([lat, lon]) => {
    const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
    return req.then(res => res.data)
}

const weatherService = {get}

export default weatherService