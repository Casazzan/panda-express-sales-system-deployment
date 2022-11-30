import RosterDisplay from './RosterDisplay';
import RosterSelector from './RosterSelector';
import {useState, useEffect} from 'react';

// https://www.w3schools.com/html/html_tables.asp
// table 

function EmployeeTabs() {
  /* these are useState hooks */
  const [toggleState, setToggleState] = useState(1);
  const [type, setType] = useState('0');
  const [changeType, setChangeType] = useState('f');
  const [RosterSummary, setRosterSummary] = useState('');
  const [userInput, setUserInput] = useState(''); 

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const deleteEmployee = async() => {
    var selected = document.getElementById("selectedEmployeeDiv").innerHTML;
    console.log(selected);
    const promise = fetch(`http://localhost:3000/roster/delete?${selected}`); 
    const response = await promise;
  }

  const updateEmployee = () => {
    var selected = document.getElementById("selectedEmployeeDiv").innerHTML;
    console.log("update employee: ", selected, changeType);
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore)  queryRosterSummary()
    return () => { ignore = true; }
    },[]);

  const queryRosterSummary = async() => {
    const promise = fetch(`http://localhost:3000/roster/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setRosterSummary(result);
  };

  const inputchangehandler = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  }

  const addEmployeeTest = async() => {
    const firstPromise = fetch(`http://localhost:3000/roster/nextID`); 
    const firstResponse = await firstPromise;
    const result = await firstResponse.json();
    var newID = result.nextID;
    console.log("submit button");
    console.log("userInput: ", userInput);
    console.log("type: ", type);
    console.log(result.nextID);
    console.log("inserting "+ userInput, newID, type);
    const promise = fetch(`http://localhost:3000/roster/add?id=${result.nextID}&name=${userInput}&manager=${type}`); 
    const response = await promise;
    setUserInput("");
    setType(0);
    console.log("Added: " + userInput + newID + type);
  }

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
        View Employees
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
        Add Employee
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
        Modify Employee
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Roster</h2>
          <RosterDisplay rosterList={RosterSummary}/>
          <p></p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Add Employee</h2>
          <hr />
              <label> Enter Name: </label>
              <input type="text" name="name" 
                    onChange={inputchangehandler} 
                    value = {userInput}/>
              <p></p>
              <label> Enter Type: </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="1">Manager</option>
                <option value="0">Regular Employee</option>
              </select> 
              <p></p>
              <button className="SubmitButton" onClick={() => addEmployeeTest()}> Submit</button>
              <p>
              </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Modify Employee</h2>
          <hr />
              <label> Select Employee you wish to modify: </label>
              <RosterSelector 
                rosterList={RosterSummary}/>
              <p></p>

              <label> Select New Type: </label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
              >
                <option value="Manager">Manager</option>
                <option value="Regular Employee">Regular Employee</option>
              </select>
              <p></p>

              <button 
                className="SubmitButton" 
                id="delete" 
                onClick={() => deleteEmployee()} >
                Delete
              </button>
              <button 
                className="SubmitButton" 
                id="update" 
                onClick={() => updateEmployee()} >
                Update
              </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTabs;
