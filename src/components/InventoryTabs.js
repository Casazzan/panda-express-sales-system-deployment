import { useState, useEffect } from "react";
import "../App.css";
import Critical from './CriticalItemsDisplay'
import Summary from './InventoryDisplay'
import InventorySelector from './InventorySelector'
import axios from 'axios'

// https://www.w3schools.com/html/html_tables.asp
// table 

function InventoryTabs() {
  const [toggleState, setToggleState] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [initial, setInitial] = useState(0);
  const [restock, setRestock] = useState(0);
  const [critical, setCritical] = useState(0);
  const [type, setType] = useState('entree');
  const [updateItemName, setUpdateItemName] = useState('Orange Chicken');
  const [updateItemAmount, setUpdateItemAmount] = useState('0');
  const [criticalItems, setCriticalResponse] = useState('0');
  const [inventorySummary, setInventorySummary] = useState('0');
  const [translations, setTranslations] = useState([
    { translatedText: "View Inventory" }, 
    { translatedText: "Current Inventory" }, 
    { translatedText: "Critical Items" }, 
    { translatedText: "Add New Item" }, 
    { translatedText: "Enter Name" }, 
    { translatedText: "Enter Price" }, 
    { translatedText: "Enter Initial Amount" }, 
    { translatedText: "Enter Default Value to Restock to" }, 
    { translatedText: "Enter Critical Inventory Threshold" }, 
    { translatedText: "Enter Type" }, 
    { translatedText: "Add Item" }, 
    { translatedText: "Update Values" }, 
    { translatedText: "Restock Options" }, 
    { translatedText: "Restock All" }, 
    { translatedText: "Restock Critical" }, 
    { translatedText: "Manually Update Inventory" }, 
    { translatedText: "Select Item to Change" }, 
    { translatedText: "Input New Amount" }, 
    { translatedText: "Submit" }, 
    { translatedText: "Delete" } 
  ]);
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "View Inventory");
      encodedParams.append("q", "Current Inventory");
      encodedParams.append("q", "Critical Items");
      encodedParams.append("q", "Add New Item");
      encodedParams.append("q", "Enter Name");
      encodedParams.append("q", "Enter Price");
      encodedParams.append("q", "Enter Initial Amount");
      encodedParams.append("q", "Enter Default Value to Restock to");
      encodedParams.append("q", "Enter Critical Inventory Threshold");
      encodedParams.append("q", "Enter Type");
      encodedParams.append("q", "Add Item");
      encodedParams.append("q", "Update Value");
      encodedParams.append("q", "Restock Options");
      encodedParams.append("q", "Restock All");
      encodedParams.append("q", "Restock Critical");
      encodedParams.append("q", "Manually Update Inventory");
      encodedParams.append("q", "Select Item to Change");
      encodedParams.append("q", "Input New Amount");
      encodedParams.append("q", "Submit");
      encodedParams.append("q", "Delete");
      encodedParams.append("target", JSON.parse(localStorage.getItem("language")));
      encodedParams.append("source", "en");

      const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': '8fbc873fd8msh5d43e6022f22f64p15f17ejsnbb456384ba17',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams
      };

      axios.request(options).then(function (response) {
          const translatedArray = response.data.data.translations
          // console.log("Within OrderHistory Display: ", response.data.data.translations)
          // console.log("Specific Element: ", translations[0].translatedText)
          setTranslations(translatedArray)
          // console.log("Test", translations)
          
      }).catch(function (error) {
          console.error(error);
      });
    }
    else {
      console.log("english")
    }
  }

  useEffect(() => {    
    changeLanguage()
  }, [setTranslations]);


  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore)  queryCrit()
    return () => { ignore = true; }
    },[]);
  
  useEffect(() => {
    let ignore = false;

    if (!ignore)  queryInventory()
    return () => { ignore = true; }
    },[]);

    const inputchangehandler = (event) => {
    setName(event.target.value);
    console.log(name);
    }


  const queryCrit = async() => {
    const promise = fetch(`http://localhost:5000/report/restock`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setCriticalResponse(result);
  };

  const updateServings = async() => {
    var selected = document.getElementById("selectedItemDiv").innerHTML;
    if (selected != "") {
      const promise = fetch(`http://localhost:5000/inventory/update_servings?id=${selected}&servings=${updateItemAmount}`); 
      const response = await promise;
      setUpdateItemAmount(0);
    }
  };

  const deleteItem = async() => {
    var selected = document.getElementById("selectedItemDiv").innerHTML;
    /*
    TODO fix after edited
    if (selected != "") {
      const promise = fetch(`http://localhost:5000/inventory/delete?id=${selected}`); 
      const response = await promise;
      setUpdateItemAmount(0);
    }
    */
  };

  const queryInventory = async() => {
    const promise = fetch(`http://localhost:5000/inventory/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setInventorySummary(result);
  };

  const restockInventory = async() => {
    const promise = fetch(`http://localhost:5000/inventory/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setInventorySummary(result);
  };

  // reset values to 0
  // setname ... 0
  const addItem = async() => {
    const firstPromise = fetch(`http://localhost:5000/inventory/nextID`); 
    const firstResponse = await firstPromise;
    const result = await firstResponse.json();
    var newID = result.nextID;
    console.log("inserting "+ name, newID, price, initial, restock, critical, type);
    const promise = fetch(`http://localhost:5000/inventory/add?id=${newID}&name=${name}&servings=${initial}&restock_quantity=${restock}&price=${price}&food_type=${type}&minimum_amount=${critical}`); 
    const response = await promise;
    setName("");
    setPrice(0);
    setInitial(0);
    setRestock(0);
    setType('entree');
    setCritical(0);
  };


  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
        { translations[0].translatedText }
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
        { translations[3].translatedText } 
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
        { translations[11].translatedText }
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2> { translations[1].translatedText } </h2>

          <Summary inventoryList={inventorySummary}/>
          <p></p>
          <h2> { translations[2].translatedText } </h2>
          <Critical itemList={criticalItems}/>
          <p></p>
      </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Add Inventory Item</h2>
          <hr />
          <p></p>
            <label> { translations[4].translatedText } </label>
            <input type="text" name="name" 
                  onChange={inputchangehandler} 
                  value = {name}/>
            <p></p>
            <label> { translations[5].translatedText } </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p></p>
            <label> { translations[6].translatedText } </label>
            <input
              type="number"
              required
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
            />
            <p></p>
            <label> { translations[7].translatedText }</label>
            <input
              type="number"
              required
              value={restock}
              onChange={(e) => setRestock(e.target.value)}
            />
            <p></p>
            <label> { translations[8].translatedText } </label>
            <input
              type="number"
              required
              value={critical}
              onChange={(e) => setCritical(e.target.value)}
            />
            <p></p>
            <label> { translations[9].translatedText } </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="side">side</option>
              <option value="entree">entree</option>
              <option value="appetizer">appetizer</option>
            </select> 
            <p></p>
            <button 
              className="SubmitButton"
              onClick={() => addItem()}>
              { translations[10].translatedText } 
            </button>
            <p>
            </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2> { translations[12]. translatedText } </h2>
            <p></p>
            <button className="SubmitCritical"> { translations[13].translatedText } </button>
            <p></p>
            <button className="SubmitCritical"> {translations[14].translatedText } </button>
            <p></p>
          <hr />
          <h2> { translations[15].translatedText } </h2>
            <label> { translations[16].translatedText } </label>
            <InventorySelector 
              rosterList={inventorySummary}/>
            <p></p>
            <label> { translations[17].translatedText } </label>
            <input
              type="number"
              required
              value={updateItemAmount}
              onChange={(e) => setUpdateItemAmount(e.target.value)}
            />
            <p></p>
            <button 
              className="SubmitCritical"
              onClick={() => updateServings()}
              id="update"
              >{ translations[18].translatedText }</button>
            <button 
              className="SubmitCritical"
              onClick={() => deleteItem()}
              id="delete"
              > { translations[19].translatedText } </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryTabs;
