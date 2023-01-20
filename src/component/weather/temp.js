import React, {useState, useEffect} from 'react'
import "./style.css"
import Weathercard from './weathercard'
function Temp() {
    const[searchValue, setSearchValue] = useState("banglore")
    const[tempInfo, setTempInfo]=useState({})
    const getWeatherInfo = async() =>{
        try {
            //&unit=metric used for changing in celceius
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=114926eaa51084d1b9f9ecdebed31700`
            const res = await fetch(url)
            const data =await  res.json();
             //object desturcturing
             const{temp, pressure, humidity}=data.main
             const{main:weathermood}= data.weather[0]
             const{name}= data
             const {speed} = data.wind
             const{country, sunset}= data.sys 
             const myNewWeatherInfo ={
                temp,
                pressure,
                humidity,
                weathermood,
                name,
                speed,
                country,
                sunset,

             }
             setTempInfo(myNewWeatherInfo)
             
            
        } catch (error) {
            console.log(error)
             
        }

    }
    useEffect(() => {getWeatherInfo()}, [])


    
  return (
    <>
      <div className="wrap">
        <div className="search">
            <input type="search" placeholder='search' autoFocus id='search' className='searchTerm' value={searchValue } onChange={(e)=>setSearchValue(e.target.value)}/>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
     < Weathercard  tempInfo={tempInfo} />
    </>
  )
}

export default Temp
