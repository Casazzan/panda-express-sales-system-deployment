import React from "react";
import ItemBox from "./itemBox";
//import { Link } from "react-router-dom";
import "./menuContainer.css";
// item images
import mixedVeg from './mixedVeg.png';
import chowMein from './chowMein.png';
import friedRice from './friedRice.png';
import whiteRice from './whiteRice.png';
import brownRice from './brownRice.png';


function sides(props) {
    return (
        <>
            <div className="menuContainer">
                <div className="menuItems">
                    <main>
                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {mixedVeg} itemName = {"mixed_vegetables"} itemTitle = {"Mixed Vegetables"} itemType = {"2"} />
                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {chowMein} itemName = {"chow_mein"} itemTitle = {"Chow Mein"} itemType = {"2"} />
                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {friedRice} itemName = {"fried_rice"} itemTitle = {"Fried Rice"} itemType = {"2"} />
                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {whiteRice} itemName = {"white_steamed_rice"} itemTitle = {"White Steamed Rice"} itemType = {"2"} />
                        <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {brownRice} itemName = {"brown_steamed_rice"} itemTitle = {"Brown Steamed Rice"} itemType = {"2"} />
                    </main>
                </div>
            </div>
        </>
    );
}

export default sides;
