import React from 'react'
import '../index2.css';
import seasonal from './comingSoon.png';
import ItemBox from "./itemBox";

class AddSeasonal extends React.Component {

    constructor(props) {

        super(props);
        this.state = {items: []};

    }

    callAPIAsyncGetSeasonal = async () => {

        //console.log((await (await fetch(`http://localhost:5003/dish_list/price?dish_id=${dishId}${idString}`)).json()));
        const promise = fetch(`http://localhost:5003/inventory/seasonal_items`);
        const response = await promise;
        const result = await response.json();
        return result;

    }

    componentDidMount() {
        this.updateSeasonals();
    }

    updateSeasonals = async () => {

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
            
            const elem = <ItemBox addToCart={(itemToAdd, index) => this.props.addToCart(itemToAdd, index)} itemImg = {seasonal} className = "img" itemName = {item.item_name} itemTitle = {item.item_name} itemType = {foodType} />
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

export default AddSeasonal;
