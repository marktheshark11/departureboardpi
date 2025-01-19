import React, { Component, useState } from 'react'
import './Header.css'

export default function Header({ trackIndex, toggleTrack, departures }) {
    return (
        <div className="header-row">
            { departures[0] ? 
                departures[0].stop : 
                [] }
            <button onClick={toggleTrack} className="header-button">{ trackIndex }</button>
        </div>
    )
}