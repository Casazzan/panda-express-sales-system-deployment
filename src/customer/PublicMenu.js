import React from "react";
import PublicItemBox from "./PublicItemBox";

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


function PublicMenu(props) {
  return (
    <>
      <div className="menuContainer">
        <div className="menuItems">
              <main>
                <PublicItemBox itemImg = {hsChicken} className = "img" itemTitle = {"Honey Seasame Chicken"} />
                <PublicItemBox itemImg = {oChicken} className = "img" itemTitle = {"Orange Chicken"} />
                <PublicItemBox itemImg = {bpaSteak} className = "img" itemTitle = {"Black Pepper Angus Steak"} />
                <PublicItemBox itemImg = {sbChicken} className = "img" itemTitle = {"String Bean Chicken Breast"} />
                <PublicItemBox itemImg = {sfChicken} className = "img" itemTitle = {"Sweetfire Chicken Breast"} />
                <PublicItemBox itemImg = {bpChicken} className = "img" itemTitle = {"Black Pepper Chicken"} />
                <PublicItemBox itemImg = {gtChicken} className = "img" itemTitle = {"Grilled Teriyaki Chicken"} />
                <PublicItemBox itemImg = {beijBeef} className = "img" itemTitle = {"Bejing Beef"} />
                <PublicItemBox itemImg = {hwShrimp} className = "img" itemTitle = {"Honey Walnut Shrimp"} />
                <PublicItemBox itemImg = {mChicken} className = "img" itemTitle = {"Mushroom Chicken"} />
                <PublicItemBox itemImg = {epTofu} className = "img" itemTitle = {"Eggplant Tofu"} />   
            </main>
        </div>
      </div>
    </>
  );
}

export default PublicMenu;
