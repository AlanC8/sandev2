"use client"
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { getUserCityWeather } from "./services/WeatherService";
import WeatherOutfit from "./components/LookDay";
import Statistics from "./components/Statistics";
import Extension from "./components/Extension";
import TryOnInterface from "./vton/page";

export default function Home() {
  useEffect(() => {
    getUserCityWeather()
  }, [])
  return (<>
    <Header/>
    <Hero/>
    <TryOnInterface/>
    <hr />
    <Statistics/>
    <Extension/>
  </>);
}
