import React from 'react'

const OrderHistoryDisplay = (props) => {
  
  console.log(props.orderList);
  const items = []
  if (!props.orderList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>transaction_id</td>
      <td>employee_id</td>
      <td>date</td>
      <td>type_of_dish</td>
      <td>entree_dish</td>
      <td>entree_amt_servings</td>
      <td>side_ingredients</td>
      <td>side_amt_servings</td>
      <td>appetizer_ingredients</td>
      <td>appetizer_amt_servings</td>
      <td>price</td>
    </tr>
  )
  for (let i = 0; i < props.orderList.length; i++) {
    if (i < 50) {
    const item = props.orderList[i];
    const itemDisplay = (
      <tr>
        <td>{item.transaction_id}</td>
        <td>{item.employee_id}</td>
        <td>{item.date}</td>
        <td>{item.type_of_dish}</td>
        <td>{item.entree_dish}</td>
        <td>{item.entree_amt_servings}</td>
        <td>{item.side_ingredients}</td>
        <td>{item.side_amt_servings}</td>
        <td>{item.appetizer_ingredients}</td>
        <td>{item.appetizer_amt_servings}</td>
        <td>{item.price}</td>
      </tr>)
      items.push(itemDisplay);
    }
  }
  return (
    <table className="OrderTable">
      {items}
    </table>
    )
}

export default OrderHistoryDisplay
