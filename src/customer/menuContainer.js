import React from "react";
import ItemBox from "./itemBox";
import { Link } from "react-router-dom";
// entree images
import hsChicken from './hsChicken.png';
import oChicken from './oChicken.png';
import bpaSteak from './bpaSteak.png';
import sbChicken from './sbChicken.png';
import sfChicken from './sfChicken.png';
import bpChicken from './bpChicken.png';
import gtChicken from './gtChicken.png';
import beijBeef from './beijBeef.png';
import hwShrimp from './hwShrimp.png';
import mChicken from './mChicken.png';
import epTofu from './epTofu.png';
// side images
import mixedVeg from './mixedVeg.png';
import chowMein from './chowMein.png';
import friedRice from './friedRice.png';
import whiteRice from './whiteRice.png';
import brownRice from './brownRice.png';
// app images
import ceRoll from './ceRoll.png';
import cShrimp from './cShrimp.png';


function menuContainer(props) {
  return (
    <>
      <div className="menuContainer">
        <div className="menuItems">
              <main>
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {hsChicken} className = "img" itemName = {"honey_seasame_chicken"} itemTitle = {"Honey Seasame Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {oChicken} className = "img" itemName = {"orange_chicken"} itemTitle = {"Orange Chicken"} itemType = {"1"}/>
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {bpaSteak} className = "img" itemName = {"black_pepper_angus_steak"} itemTitle = {"Black Pepper Angus Steak"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {sbChicken} className = "img" itemName = {"string_bean_chicken_breast"} itemTitle = {"String Bean Chicken Breast"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {sfChicken} className = "img" itemName = {"sweetfire_chicken_breast"} itemTitle = {"Sweetfire Chicken Breast"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {bpChicken} className = "img" itemName = {"black_pepper_chicken"} itemTitle = {"Black Pepper Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {gtChicken} className = "img" itemName = {"grilled_teriyaki_chicken"} itemTitle = {"Grilled Teriyaki Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {beijBeef} className = "img" itemName = {"bejing_beef"} itemTitle = {"Bejing Beef"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {hwShrimp} className = "img" itemName = {"honey_walnut_shrimp"} itemTitle = {"Honey Walnut Shrimp"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {mChicken} className = "img" itemName = {"mushroom_chicken"} itemTitle = {"Mushroom Chicken"} itemType = {"1"} />
                <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {epTofu} className = "img" itemName = {"eggplant_tofu"} itemTitle = {"Eggplant Tofu"} itemType = {"1"} />   
            </main>
        </div>
      </div>
    </>
  );
}

export default menuContainer;
