import  {useState, useEffect} from 'react';
import  {getWeatherData}  from './data/weatherapi';
import './App.css';
import { ScaleLoader } from 'react-spinners';

function App() {
  const[weatherdata, setWeatherData] = useState<any>({});
  const[city, setCity] = useState('Davao');
  const[loading, setLoading] = useState(true)
  
  const getData = async () =>{  
    try{
      if(setLoading){
        const data = await getWeatherData(city);
        setWeatherData(data)
        setLoading(false);
      }
    }catch(error){
      setLoading(false);
    }
  }
  const override= `
    display:block;
    margin:0 auto;
    border-color:red;
  `;
  useEffect(()=>{
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="App">
      <div className="card">
        <h2 className="title"><i className='fa fa-cloud'>Weather App</i></h2>
        <div className="search-form">
          <input
            type="text"
            name ="city"
            placeholder='Enter your city'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />
          <button type='button' onClick={()=>getData()}>Search</button>
        </div>
        
        {loading ? (
          <div className="loader-container">
          <ScaleLoader

          css={override}
          color={"#fff"}
          loading={loading} 
          />
        </div> 
        ) : (
          <>  
        {weatherdata  ? (
        <div className="main-container">
            <h4>Live Weather Condition</h4>
           
            <div className="weather-icon">
              <img src={`https://openweathermap.org/img/w/${weatherdata.data.weather[0].icon}.png`} alt="imgicon" />
            </div>
            <h3>{weatherdata.data.weather[0].main}</h3>
            <div className="temperature">
              <h1>{(weatherdata.data.main.temp - 273.15).toFixed(1)}&deg;C</h1>
            </div>
            <div className="location">
           <h3><i className='fa fa-street-view'> </i> {weatherdata.data.name} | {weatherdata.data.sys.country} </h3>
            </div>

            <div className="temperature-range">
              <h6>Min: {(weatherdata.data.main.temp_min -273.15).toFixed(1)}&deg;C || Max: {(weatherdata.data.main.temp_max -273.15).toFixed(1)}&deg;C || Humidity: {weatherdata.data.main.humidity}%</h6>
            </div>
        </div>
        ):null}
         </>
        ) }
      </div>
    </div>
  );
}

export default App;
