import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import cloudIcon from "../assets/icons/cloud.png";
import sunIcon from "../assets/icons/sunny.png";
import fogIcon from "../assets/icons/fog.png";
import rainIcon from "../assets/icons/rain.png";

import sunnyBg from "../assets/images/Sunny.jpg";
import clearBg from "../assets/images/Clear.jpeg";
import cloudBg from "../assets/images/Cloudy.webp";
import rainBg from "../assets/images/Rain.avif";
import ForeCast from "./ForeCast";

function WeatherPage() {
  const { cityName } = useParams();
  //console.log("citi  ",cityName);
  //  https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  const APIKEY = import.meta.env.VITE_API_KEY;

  const [weatherData, setWeatherData] = useState(null);

  const [wIcons, setWIcons] = useState(sunIcon);

  const [weatherBg, setWeatherBg] = useState(sunnyBg);

  const [currDate, setCurrDate] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
        );

        setWeatherData(res.data);
      } catch (err) {
        console.log("Error Occured", err);
      }
    };

    fetchWeatherData();
  }, []);

  // console.log(" check  ", weatherData);

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      const weatherIcon = weatherData.weather[0].main;

      if (weatherIcon === "Clouds") {
        setWIcons(cloudIcon);
        setWeatherBg(cloudBg);
      } else if (weatherIcon === "Fog") {
        setWIcons(fogIcon);
        setWeatherBg(cloudBg);
      } else if (weatherIcon === "Clear") {
        setWIcons(sunIcon);
        setWeatherBg(clearBg);
      } else if (weatherIcon === "Rain") {
        setWIcons(rainIcon);
        setWeatherBg(rainBg);
      }
    }

    const date = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    setCurrDate(date.toLocaleDateString("en-Us", options));
  }, [weatherData]);

  return (
    <div>
      <div>
        {/* component */}
        {weatherData && (
          <div
            className="min-h-screen flex items-center justify-center"
            style={{
              backgroundImage: `url(${weatherBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs border-2 rounded-[19px] border-cyan-200 hover:border-cyan-300 ">
              <div className="font-bold text-xl">{cityName}</div>
              <div className="text-sm text-gray-500">{currDate}</div>
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img src={wIcons} alt="" />
                {/* <svg
      className="w-32 h-32"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg> */}
              </div>
              <div className="flex flex-row items-center gap-5 justify-center mt-6">
                <div className="font-medium text-6xl">
                  {(weatherData.main.temp - 273.15).toFixed(1)}°c
                </div>
                <div className="flex flex-col items-center ml-6">
                  <div>{weatherData.weather[0].main}</div>
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up" />
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {(weatherData.main.temp_max - 273.15).toFixed(1)}°c
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">
                      <i className="far fa-long-arrow-down" />
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {(weatherData.main.temp_min - 273.15).toFixed(1)}°c
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.wind.speed}m/s
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.main.humidity}%
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Pressure</div>
                  <div className="text-sm text-gray-500">
                    {weatherData.main.pressure}hPa
                  </div>
                </div>
              </div>
            </div>
            {/* <ForeCast/> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;
