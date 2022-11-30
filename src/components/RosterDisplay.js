import React from 'react'

const RosterDisplay = (props) => {
  
  console.log(props.rosterList);
  const items = []
  if (!props.rosterList) {
    return (<div></div>);
  }
  items.push(
    <tr>
      <td>ID</td>
      <td>Name</td>
      <td>Position</td>
    </tr>
  )
  var manager = "help";
  for (let i = 0; i < props.rosterList.length; i++) {
    const item = props.rosterList[i];
    if (item.is_manager) {
      console.log("HERE");
      manager = "true";
    }
    else {
      manager = "false";
    }
    const RosterDisplay = (
      <tr>
        <td>{item.employee_id}</td>
        <td>{item.employee_name}</td>
        <td>{manager}</td>
      </tr>)
      items.push(RosterDisplay);
  }
  return (
    <table className="RosterTable">
      {items}
    </table>
    )
}

export default RosterDisplay