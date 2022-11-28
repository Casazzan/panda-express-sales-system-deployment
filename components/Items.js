import React from 'react'
import '../index2.css';
import ItemChoiceButton from './ItemChoiceButton';
import { useNavigate } from 'react-router-dom';

const Items = () => {
    let navigate = useNavigate();

    var test = [[[""]]];

    const addToCart = (itemToAdd, index) => {
      var mylistoforders = JSON.parse(localStorage.getItem('CurrentOrder'));

      
      var thirdindex = mylistoforders[mylistoforders.length-1][index].length;
      
      
      mylistoforders[mylistoforders.length-1][index][thirdindex] = itemToAdd;

      localStorage.setItem('CurrentOrder', JSON.stringify(mylistoforders));
    }

    return (
      <div class = "ItemScreen">
          <div class = "NavButton" id = "ItemAdd" onClick={() => {navigate("/ServerMenu")}}><ItemChoiceButton Name = "Add To Order" /></div>
          <div id = "ItemButtons">
            <div class = "EntreeButton" id = "honey_seasame_chicken" onClick={() => {addToCart("honey_seasame_chicken", 1)}}><ItemChoiceButton Name = "HS CKN"/></div>
            <div class = "EntreeButton" id = "orange_chicken" onClick={() => {addToCart("orange_chicken", 1)}}><ItemChoiceButton Name = "O CKN"/></div>
            <div class = "EntreeButton" id = "black_pepper_angus_steak" onClick={() => {addToCart("black_pepper_angus_steak", 1)}}><ItemChoiceButton Name = "BPA STK"/></div>
            <div class = "EntreeButton" id = "string_bean_chicken_breast" onClick={() => {addToCart("string_bean_chicken_breast", 1)}}><ItemChoiceButton Name = "SB CKN"/></div>
            <div class = "EntreeButton" id = "sweetfire_chicken_breast" onClick={() => {addToCart("sweetfire_chicken_breast", 1)}}><ItemChoiceButton Name = "SF CKN"/></div>
            <div class = "EntreeButton" id = "black_pepper_chicken" onClick={() => {addToCart("black_pepper_chicken", 1)}}><ItemChoiceButton Name = "BP CKN"/></div>
            <div class = "EntreeButton" id = "grilled_teriyaki_chicken" onClick={() => {addToCart("grilled_teriyaki_chicken", 1)}}><ItemChoiceButton Name = "GT CKN"/></div>
            <div class = "EntreeButton" id = "bejing_beef" onClick={() => {addToCart("bejing_beef", 1)}}><ItemChoiceButton Name = "BJNG BF"/></div>
            <div class = "EntreeButton" id = "honey_walnut_shrimp" onClick={() => {addToCart("honey_walnut_shrimp", 1)}}><ItemChoiceButton Name = "HW SHRMP"/></div>
            <div class = "EntreeButton" id = "mushroom_chicken" onClick={() => {addToCart("mushroom_chicken", 1)}}><ItemChoiceButton Name = "M CKN"/></div>
            <div class = "EntreeButton" id = "eggplant_tofu" onClick={() => {addToCart("eggplant_tofu", 1)}}><ItemChoiceButton Name = "EP TFU"/></div>
            
            <div class = "SideButton" id = "mixed_vegetables" onClick={() => {addToCart("mixed_vegetables", 2)}}><ItemChoiceButton Name = "SIDE VG"/></div>
            <div class = "SideButton" id = "chow_mein" onClick={() => {addToCart("chow_mein", 2)}}><ItemChoiceButton Name = "SIDE CM"/></div>
            <div class = "SideButton" id = "fried_rice" onClick={() => {addToCart("fried_rice", 2)}}><ItemChoiceButton Name = "SIDE FR"/></div>
            <div class = "SideButton" id = "white_steamed_rice" onClick={() => {addToCart("white_steamed_rice", 2)}}><ItemChoiceButton Name = "SIDE WR"/></div>
            <div class = "SideButton" id = "brown_steamed_rice" onClick={() => {addToCart("brown_steamed_rice", 2)}}><ItemChoiceButton Name = "SIDE BR"/></div>
            
            <div class = "AppButton" id = "chicken_egg_roll" onClick={() => {addToCart("chicken_egg_roll", 3)}}><ItemChoiceButton Name = "APP ER"/></div>
            <div class = "AppButton" id = "crispy_shrimp" onClick={() => {addToCart("crispy_shrimp", 3)}}><ItemChoiceButton Name = "APP SHRMP"/></div>
          </div>
      </div>
      )
  }
  
  export default Items