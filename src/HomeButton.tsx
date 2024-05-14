import React, { useState } from 'react';
import './CSS/App.css';
import HomeButtonImage from './resources/homeButton.png';
import { useNavigate } from 'react-router-dom';

const ReturnToHome = () => {
    const navigate = useNavigate();
    const returnHome = () => {
        console.log("CLICKED RETURN HOME BUTTON")
        navigate("/start")
    };


    return (
        <>
            <button className="homeButton" onClick={returnHome}>
                <img src={HomeButtonImage} alt="Home" />
            </button>

        </>
    );
};

export  default ReturnToHome