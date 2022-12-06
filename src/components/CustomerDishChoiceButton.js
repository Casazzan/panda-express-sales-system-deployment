/**
 * Button for the landing page of customer
 * @function
 * @param {string} Name - The name the React component is going to display.
 * @returns {Component} A React component displaying the name object passed in.
 */
const CustomerDishChoiceButton = ( { Name }) => {
  return ( 
    <div id = "CustomerDishChoiceButton">
      <h1>{Name}</h1>
    </div>
  )
}



export default CustomerDishChoiceButton