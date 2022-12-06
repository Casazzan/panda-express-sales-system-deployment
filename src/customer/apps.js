import React from "react";
import ItemBox from "./itemBox";
import "./menuContainer.css";
import { Link } from "react-router-dom";
// item images
import ceRoll from './ceRoll.png';
import cShrimp from './cShrimp.png';
import AddSeasonal from "./AddSeasonal";

function apps(props) {
    return (
        <>
            <div className="menuContainer">
                <div className="menuItems">
                    <main>

                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {ceRoll} itemName = {"chicken_egg_roll"} itemTitle = {"Chicken Egg Roll"} itemType = {"3"} />
                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {cShrimp} itemName = {"crispy_shrimp"} itemTitle = {"Crispy Shrimp"} itemType = {"3"} />
                    
                        <AddSeasonal addToCart = {(itemToAdd, index) => props.addToCart(itemToAdd, index)}/>

                    </main>
                </div>
            </div>
        </>
    );
}

export default apps;
