import React from 'react';
import Header from "./header";
import Entrees from "./entrees";
import "./menuContainer.css";


const entreeOption = () => {
    return (
        <>
            <div className="container">
                <Header />
                <Entrees />
            </div></>
    )
}

export default entreeOption