import axios from 'axios';

export const getWeatherData = async (cityName: string) =>{
    const baseUrl ='https://api.openweathermap.org/data/2.5/weather?';
    const apiKey ='6ec83b1bc0dc4a6dd15c85d681398a42';

    try{
        const data = await axios.get(baseUrl + `q=${cityName}&appid=${apiKey}`)
        return data;
    }catch(error){
        throw error;
    }

}

