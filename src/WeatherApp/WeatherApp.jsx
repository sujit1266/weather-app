import React, {useState} from 'react';
import "./WeatherApp.scss";


import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";


function WeatherApp() {
  let apiKey = "cee96178ae2d89ed38e12ff899844e6f";
  const [wicon, setwicon]=useState(cloud_icon);

  const search = async () => {
    const element=document.getElementsByClassName("cityInput");
    if(element[0].value===0){
      return 0;
    }
    let API_URL= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;

    let response= await fetch(API_URL);
    let data=await response.json();
    const humidity=document.getElementsByClassName("humidity-persentage");
    const wind = document.getElementsByClassName("wind-rate");
    const temp = document.getElementsByClassName("weather-temp");
    const location =document.getElementsByClassName("weather-location");

    humidity[0].innerHTML=data.main.humidity+"%";
    wind[0].innerHTML=data.wind.speed+" km/h";
    temp[0].innerHTML=data.main.temp+"℃";
    location[0].innerHTML=data.name;

    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setwicon(clear_icon);
    }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setwicon(cloud_icon);
    }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
      setwicon(drizzle_icon);
    }else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setwicon(drizzle_icon);
    }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
      setwicon(rain_icon);
    }else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
      setwicon(rain_icon);
    }else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setwicon(snow_icon);
    }else{
      setwicon(clear_icon);
    }
  }


  return (
    <div className='main-container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='search'></input>
        <div className='search-icon' onClick={()=>{search()}}>
          <img src={search_icon} alt="search-button"></img>
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="weather image"></img>
      </div>
      <div className='weather-temp'>24℃</div>
      <div className='weather-location'>london</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='humidity_image' className='icon'></img>
          <div className='data'>
            <div className='humidity-persentage'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='wind_image' className='icon'></img>
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
