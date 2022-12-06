import React from "react";
import PublicItemBox from "../PublicItemBox";
import "../menuContainer.css";
import { Link } from "react-router-dom";
// item images
import ceRoll from '../ceRoll.png';
import cShrimp from '../cShrimp.png';

import AddSeasonal from "./PublicAddSeasonal";

function PublicApps(props) {
    return (
        <>
            <div className="menuContainer">
                <div className="menuItems">
                    <main>
                        
                        <PublicItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {ceRoll} itemName = {"chicken_egg_roll"} itemTitle = {"Chicken Egg Roll"} itemType = {"3"} />
                        <PublicItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {cShrimp} itemName = {"crispy_shrimp"} itemTitle = {"Crispy Shrimp"} itemType = {"3"} />
                        
                        <AddSeasonal />

                    </main>
                </div>
            </div>
        </>
    );
}

export default PublicApps;
