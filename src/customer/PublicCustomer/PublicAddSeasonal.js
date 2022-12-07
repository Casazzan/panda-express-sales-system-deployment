import React from 'react'

import seasonal from '../comingSoon.png';
import ItemBox from "../PublicItemBox";

class PublicAddSeasonal extends React.Component {

    constructor(props) {

        super(props);
        this.state = {items: []};

    }

    callAPIAsyncGetSeasonal = async () => {

        //console.log((await (await fetch(`http://localhost:5002/dish_list/price?dish_id=${dishId}${idString}`)).json()));
        const promise = fetch(`http://localhost:5002/inventory/seasonal_items`);
        const response = await promise;
        const result = await response.json();
        return result;

    }

    componentDidMount() {
        this.updateSeasonals();
    }

    updateSeasonals = async (props) => {

        const seasonalItemsList = await this.callAPIAsyncGetSeasonal();
  
        let seasonal_items_elements = [];
        let numItems = 1;

        for (const item of seasonalItemsList) {
            
            let foodType = 0;

            if (item.food_type === "entree") {foodType = 1;}
            else if (item.food_type === "side") {foodType = 2;}
            else {foodType = 3;}

            let buttonLabel = 'SEASON ';
            buttonLabel += numItems;

            const elem = <ItemBox addToCart={(itemToAdd, index) => props.addToCart(itemToAdd, index)} itemImg = {seasonal} className = "img" itemName = {item.item_nam} itemTitle = {item.item_name} itemType = {foodType} />
            
            seasonal_items_elements.push(elem);
        }

        this.setState({items: seasonal_items_elements});

    }

    render() {
        return (
            <div>
                {this.state.items}
            </div>
        )
    }
}

export default PublicAddSeasonal;
