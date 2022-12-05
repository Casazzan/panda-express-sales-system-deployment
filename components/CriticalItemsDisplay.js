import React from 'react'

const CriticalItemsDisplay = (props) => {
  
  console.log(props.itemList);
  const items = []
  if (!props.itemList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>Name</td>
      <td>Amount</td>
      <td>Restock Quantity</td>
    </tr>
  )
  for (let i = 0; i < props.itemList.length; i++) {
    const item = props.itemList[i];
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

export default CriticalItemsDisplay
