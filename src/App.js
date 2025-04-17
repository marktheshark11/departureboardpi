import React, { useState, useEffect } from 'react';
import Departureboard from './Departureboard';
import Header from './Header';
import './App.css';

const API_KEY = "29391c37-8ff4-4d39-bffa-6c88c5b927a8";
const ID_Telefonplan = "740021716"
const products = "32"; // 32 = T-Bana
const duration = 1439; // 10 hours, time for future departures
const passlist = 1; // 1 for all stops
const apiUrl = `https://api.resrobot.se/v2.1/departureBoard?id=${ID_Telefonplan}&format=json&accessId=${API_KEY}&products=${products}&duration=${duration}&passlist=${passlist}`; 


export default function App() {
  const [departures, setDepartures] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Data has been fetched", new Date())
      setDepartures(data.Departure);
    }
    fetchData();

    const fetchInterval = setInterval(fetchData, 600000); // 10 minutes

    return () => clearInterval(fetchInterval);
  }, []); // empty array => run once on mount

  useEffect(() => {
    const reRenderInterval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 10000);  // Tick state changes every 10seconds, forcing a re-render. All setState functions force re-render in React

    return () => clearInterval(reRenderInterval);
  }, []);

  const toggleTrack = () => {
    setTrackIndex((prev) => {
        if (prev >= 2) {
            return 0;
        }
        return prev + 1;
    });
  }

  return (
    <div className="glow">
      <div>
        <Header trackIndex={ trackIndex } toggleTrack={ toggleTrack } departures={ departures }/>
      </div>
      <div>
        <Departureboard departures={ departures } trackIndex={ trackIndex } />
      </div>
    </div>
  );

}
