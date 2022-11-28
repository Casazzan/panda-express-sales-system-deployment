import React from "react";
import PublicItemBox from "../PublicItemBox";
//import { Link } from "react-router-dom";
import "../menuContainer.css";
// item images
import mixedVeg from '../mixedVeg.png';
import chowMein from '../chowMein.png';
import friedRice from '../friedRice.png';
import whiteRice from '../whiteRice.png';
import brownRice from '../brownRice.png';


function PublicSides(props) {
    return (
        <>
            <div className="menuContainer">
                <div className="menuItems">
                    <main>
            
                        <PublicItemBox itemImg = {mixedVeg} className = "img" itemTitle = {"Mixed Vegetables"}  />
                        <PublicItemBox itemImg = {chowMein} className = "img" itemTitle = {"Chow Mein"} />
                        <PublicItemBox itemImg = {friedRice} className = "img" itemTitle = {"Fried Rice"} />
                        <PublicItemBox itemImg = {whiteRice} className = "img" itemTitle = {"White Steamed Rice"} />
                        <PublicItemBox itemImg = {brownRice} className = "img" itemTitle = {"Brown Steamed Rice"} />

                    </main>
                </div>
            </div>
        </>
    );
}

export default PublicSides;
