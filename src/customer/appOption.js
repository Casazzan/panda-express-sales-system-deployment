import React from 'react';
import Header from "./header";
import Apps from "./apps";
import "./menuContainer.css";


const appOption = () => {
    return (
        <>
            <div className="container">
                <Header />
                <Apps />
            </div></>
    )
}

export default appOption