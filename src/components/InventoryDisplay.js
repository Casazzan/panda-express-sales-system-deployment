import React from 'react'

const InventoryDisplay = (props) => {
  
  console.log(props.inventoryList);
  const items = []
  if (!props.inventoryList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>item_id</td>
      <td>item_name</td>
      <td>servings</td>
      <td>restock_quantity</td>
      <td>item_price</td>
      <td>food_type</td>
      <td>minimum_amount</td>
    </tr>
  )
  for (let i = 0; i < props.inventoryList.length; i++) {
    const item = props.inventoryList[i];
    const itemDisplay = (
      <tr>
        <td>{item.item_id}</td>
        <td>{item.item_name}</td>
        <td>{item.servings}</td>
        <td>{item.restock_quantity}</td>
        <td>{item.item_price}</td>
        <td>{item.food_type}</td>
        <td>{item.minimum_amount}</td>
      </tr>)
      items.push(itemDisplay);
  }
  return (
    <table>
      {items}
    </table>
    )
}

export default InventoryDisplay
