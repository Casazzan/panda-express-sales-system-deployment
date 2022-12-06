import React from 'react'
import '../index2.css';
import ItemChoiceButton from './ItemChoiceButton';

class MakeSeasonal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    callAPIAsyncGetSeasonal = async () => {
        //console.log((await (await fetch(`http://localhost:5001/dish_list/price?dish_id=${dishId}${idString}`)).json()));
        const promise = fetch(`http://localhost:5001/inventory/seasonal_items`);
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
            const elem = <div class = "SeasonalButton" onClick={() => {this.props.addToCart(item.item_name, foodType)}}><ItemChoiceButton Name = {buttonLabel}/></div>
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

export default MakeSeasonal;
