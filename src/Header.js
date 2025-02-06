import React, { Component, useState } from 'react'
import './Header.css'

export default function Header({ trackIndex, toggleTrack, departures }) {
    return (
        <div className="header-row">
            { departures[0] ? 
                departures[0].stop : 
                [] }
            <button onClick={toggleTrack} className="header-button">{ displayTrackIndex(trackIndex) }</button>
        </div>
    )
}


// Helper functions

function displayTrackIndex(trackIndex) {
    if (trackIndex === 0) {
        return "1|2"
    }
    if (trackIndex === 2) {
        return "2"
    }
    if (trackIndex === 1) {
        return "1"
    }
}