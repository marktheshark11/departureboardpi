import React, { Component, useState } from 'react'
import './Departureboard.css'
import './App.css'
import { FaAngleDown } from "react-icons/fa";

const Info = ({ departure }) => {
  return (
    <div className="info">
      <div className="destination">{ getSlicedDestinationString(departure.direction) }</div>
      <div className="arrival-time noglow" style={{ color: getArrivalTimeColor(departure), textShadow: `0px 0px 2px ${getArrivalTimeColor(departure)}` }}>{ getArrivalString(departure) }</div>
    </div>
  )
}

const Stops = ({ stops }) => {
  return (
    <div className="stops">
      {stops.map((stop, index) => (
        <Stop key={index} stop={stop}/>
      ))}
    </div>
  )
}

const Stop = ({ stop }) => {
  return (
    <div className="row">
      <StopName destination={ getSlicedDestinationString(stop.name) } />
      <StopTime time={ stop.arrTime.slice(0, 5) }/>
    </div>

  )
}

const StopName = ({ destination }) => {
  return (
    <div className="stop-destination">{ destination }</div>
  )
}

const StopTime = ({ time }) => {
  return (
    <div className="stop-time">{ time }</div>
  )
}

const Departure = ({ isExpanded, departure, onToggle, showDirectionsIndex }) => {
  return (
    <div className = "departure">
      <div onClick={onToggle}>
        <div className="row" >
          <div className="line-icon">{ departure.Product[0].line }</div>
          <Info departure={departure || 'departure'}/>
        </div>
        <div className="row"> { isExpanded &&
        (
          <Stops stops={ departure.Stops.Stop.slice(1) || ["stopp"] } />
        )}
        </div>
        <div className="row">          
          <FaAngleDown className="icon"/>
        </div>
        <div className="border"> </div>
      </div>
    </div>
  )
}

export default function Departureboard({ departures, trackIndex }) {

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpansion = (index) => {
    console.log("klickad på rad", index)
    setExpandedIndex((prevIndex) => {
      console.log(expandedIndex)
      return (prevIndex === index ? null : index)});
  };
  return (
    <div className="departureboard glow">
      {departures
      .filter(departure => getMinsToArrival(departure) > -2)
      .filter(departure => {
        return departure.directionFlag !== `${trackIndex}`;
      })
      .map((departure, index) => {
        const isExpanded = expandedIndex === index;
        
        return  <Departure isExpanded={isExpanded} onToggle={() => toggleExpansion(index)} key={index} departure={departure}/>;
      })}
    </div>
  )
}

// Helper functions

function getArrivalString(departure) {
  const arrivalTime = departure.time;
  const timeToArrival = getMinsToArrival(departure);
  if (timeToArrival > 30) {
    return arrivalTime.slice(0, 5);
  }
  if (timeToArrival <= 0 && timeToArrival >= -1) {
    return "Nu";
  }
  return `${timeToArrival} min`;
}

function getMinsToArrival(departure) {
  const arrivalDate = departure.date;
  const arrivalTime = departure.time;
  const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
  const now = new Date();
  const timeToArrival = Math.ceil((arrival-now)/1000 / 60);

  return timeToArrival;
}

function getSlicedDestinationString(str) {
  const marker = " T-bana";
  const index = str.indexOf(marker);
  if (index === -1) {
    // If " T-bana" isn't in the string, return the entire original
    return str;
  } else {
    return str.slice(0, index);
  }
}

function getArrivalTimeColor(departure) {
  const arrivalTime = departure.time;
  const minsToArrival = getMinsToArrival(departure);
  if (minsToArrival < 15 && minsToArrival >= 10) {
    return "yellow";
  } else if (minsToArrival < 10) {
    return "red";
  } else {
    return "white";
  }
}