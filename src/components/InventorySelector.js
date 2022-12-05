import {useState} from 'react';

const InventorySelector = (props) => {

  const [selectedItem, setSelectedItem] = useState('');

  console.log(props.rosterList);
  const itemNames = []
  if (!props.rosterList) {
    return (<label>Empty Inventory</label>);
  }
  for (let i = 0; i < props.rosterList.length; i++) {
    const item = props.rosterList[i];
    const ItemSelector = (
      <option value={item.item_id}>{item.item_name}</option>)
      itemNames.push(ItemSelector);
  }
  return ( 
    <div>
    <select name="inventory" id="itemSelector" onChange={(e) =>{
      const selected = e.target.value;
      setSelectedItem(selected);
    }}>
      {itemNames}
    </select>
    <span id="selectedItemDiv" hidden>
    {selectedItem}
    </span>
    </div>
  );
}

export default InventorySelector
