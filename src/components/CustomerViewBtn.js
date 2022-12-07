/**
 * Button for the cusotmer view when looking at items
 * @function
 * @param {string} Name - The name the React component is going to display.
 * @returns {Component} A React component displaying the name object passed in.
 */
const CustomerViewBtn = ( { Name }) => {
  return ( 
    <div id = "CustomerViewBtn">
      <h1>{Name}</h1>
    </div>
  )
}


export default CustomerViewBtn