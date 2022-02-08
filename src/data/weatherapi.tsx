import axios from 'axios';

export const getWeatherData = async (cityName: string) =>{
    const baseUrl ='https://api.openweathermap.org/data/2.5/weather?';
    const apiKey ='{your api key here}';

    try{
        const data = await axios.get(baseUrl + `q=${cityName}&appid=${apiKey}`)
        return data;
    }catch(error){
        throw error;
    }

}

