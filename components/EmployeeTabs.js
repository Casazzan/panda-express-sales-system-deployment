import { useState } from "react";
import "../App.css";
import {Form} from './Form'

// https://www.w3schools.com/html/html_tables.asp
// table 

function EmployeeTabs() {
  const [toggleState, setToggleState] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [id, setID] = useState('0');
  const [changeID, setChangeID] = useState('0');
  const [changeName, setChangeName] = useState('John Doe');
  const [changeType, setChangeType] = useState('f');


  const toggleTab = (index) => {
    setToggleState(index);
  };

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
          <table>
            <tr>
              <td>Name</td>
              <td>Position</td>
              <td>ID</td>
            </tr>
          </table>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Add Employee</h2>
          <hr />
            <form>
              <label> Enter Name: </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p></p>
              <label> Enter ID: </label>
              <input
                type="number"
                required
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
              <p></p>
              <label> Enter Type: </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Manager">Manager</option>
                <option value="Regular Employee">Regular Employee</option>
              </select> 
              <p></p>
              <button className="SubmitButton">Submit</button>
              <p>
                {name}
                {type}
                {id}
              </p>
            </form>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Modify Employee</h2>
          <hr />
          <form>
            <label> Select Employee you wish to modify: </label>
            <select
              value={type}
              onChange={(e) => setChangeType(e.target.value)}
            >
            /* TODO change to read from database */
              <option value="Barbra Linder">Barbra Linder</option>
              <option value="Lewis Smith">Lewis Smith</option>
              <option value="Lydia Johnson">Lidia Johnson</option>
            </select> 
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

            <label>Enter New Name: </label>
            <input
              type="text"
              required
              value={changeName}
              onChange={(e) => setChangeName(e.target.value)}
            />
            <p></p>

            <label>Enter New ID: </label>
            <input
              type="number"
              required
              value={changeID}
              onChange={(e) => setChangeID(e.target.value)}
            />
            
            <p></p>
            <button className="SubmitButton">Sumbit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTabs;
