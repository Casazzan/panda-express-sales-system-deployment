import React from 'react'

const InventoryDisplay = (props) => {
  
  console.log(props.inventoryList);
  const items = []
  if (!props.inventoryList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>Name</td>
      <td>Amount</td>
      <td>Restock Quantity</td>
    </tr>
  )
  for (let i = 0; i < props.inventoryList.length; i++) {
    const item = props.inventoryList[i];
    const itemDisplay = (
      <tr>
        <td>{item.item_name}</td>
        <td>{item.servings}</td>
        <td>{item.restock_quantity}</td>
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
