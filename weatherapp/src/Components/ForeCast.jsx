import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import cloudIcon from "../assets/icons/cloud.png";
import sunIcon from "../assets/icons/sunny.png";
import fogIcon from "../assets/icons/fog.png";
import rainIcon from "../assets/icons/rain.png";

const ForeCast = () => {
  const [foreCastData, setForeCastData] = useState([]);
  const [londing, setLoading] = useState(true);
  // const [wIforeCastIcon, setWIForeCastIcons] = useState(sunIcon)

  const { cityName } = useParams();
  const APIKEY = import.meta.env.VITE_API_KEY;

  //  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  useEffect(() => {
    const fetchForeCastData = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`
        );

        const dailyForecast = res.data.list.filter(
          (item, index) => index % 8 === 0
        );

        setForeCastData(dailyForecast);
        setLoading(false);
      } catch (err) {
        console.log("Error Occured", err);
      }
    };

    fetchForeCastData();
  }, [cityName]);

  //   useEffect(() => {

  //     if (foreCastData && foreCastData.weather){

  //     const weatherIcon = foreCastData.weather[0].main;

  //     if(weatherIcon === "Clouds"){
  //         setWIForeCastIcons(cloudIcon)
  //      //   setWeatherBg(cloudBg)
  //     }
  //     else if (weatherIcon === "Fog"){
  //         setWIForeCastIcons(fogIcon)
  //      //   setWeatherBg(cloudBg)
  //     }
  //     else if(weatherIcon === "Clear"){
  //         setWIForeCastIcons(sunIcon)
  //     //    setWeatherBg(clearBg)
  //     }
  //     else if(weatherIcon === "Rain"){
  //         setWIForeCastIcons(rainIcon)
  //       //  setWeatherBg(rainBg)
  //     }
  // }

  // // const date = new Date();

  // //  const options = {weekday:"long", year:"numeric", month:"long", day:"numeric"}

  // //  setCurrDate(date.toLocaleDateString("en-Us", options))

  //  },[foreCastData])

  return (
    <div>
      <h1>Forecast</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {foreCastData.map((day, index) => {
            let weatherIcon;
            if (day.weather[0].main === "Clouds") {
              weatherIcon = cloudIcon;
            } else if (day.weather[0].main === "Rain") {
              weatherIcon = rainIcon;
            } else if (day.weather[0].main === "Clear") {
              weatherIcon = sunIcon;
            } else if (day.weather[0].main === "Fog") {
              weatherIcon = fogIcon;
            }

            const date = new Date(day.dt_txt);
            const foreCastDate = date.toLocaleDateString("en-Us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div key={index}>
                <p>Date: {foreCastDate}</p>
                <img src={weatherIcon} alt="" className="w-[30px]" />
                <p>Temperature:{(day.main.temp - 273.15).toFixed(2)}c</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ForeCast;
