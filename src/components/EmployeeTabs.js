import RosterDisplay from './RosterDisplay';
import RosterSelector from './RosterSelector';
import {useState, useEffect} from 'react';
import axios from 'axios'

// https://www.w3schools.com/html/html_tables.asp
// table 

function EmployeeTabs() {
  /* these are useState hooks */
  const [toggleState, setToggleState] = useState(1);
  const [type, setType] = useState('0');
  const [changeType, setChangeType] = useState('0');
  const [RosterSummary, setRosterSummary] = useState('');
  const [userInput, setUserInput] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [translations, setTranslations] = useState([
    { translatedText: "View Employees" }, 
    { translatedText: "Roster" }, 
    { translatedText: "Add Employee" }, 
    { translatedText: "Enter Name" }, 
    { translatedText: "Enter Type" }, 
    { translatedText: "Update" }, 
    { translatedText: "Modify Employee" }, 
    { translatedText: "Select the employee you wish to modify" }, 
    { translatedText: "Select New Type" }, 
    { translatedText: "Enter Email Address" }, 
    { translatedText: "Delete" }, 
    { translatedText: "Normal" }, 
    { translatedText: "Manager" }, 
  ]);
  const changeLanguage = () => {
    // var selected = document.getElementById("selectedLanguageDiv").innerHTML;
    if (JSON.parse(localStorage.getItem("language")) != "en") {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", "View Employees");
      encodedParams.append("q", "Roster");
      encodedParams.append("q", "Add Employee");
      encodedParams.append("q", "Enter Name");
      encodedParams.append("q", "Enter Type");
      encodedParams.append("q", "Update");
      encodedParams.append("q", "Modify Employee");
      encodedParams.append("q", "Selecte the employee you wish to modify");
      encodedParams.append("q", "Select New Type");
      encodedParams.append("q", "Enter Email Address");
      encodedParams.append("q", "Delete");
      encodedParams.append("q", "Normal");
      encodedParams.append("q", "Manager");
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

  const deleteEmployee = async() => {
    var selected = document.getElementById("selectedEmployeeDiv").innerHTML;
    console.log(selected);
    console.log("delete employee: ", selected);
    const promise = fetch(`http://localhost:5002/roster/delete?id=${selected}`); 
    const response = await promise;
  }

  const updateEmployee = async() => {
    var selected = document.getElementById("selectedEmployeeDiv").innerHTML;
    console.log("update employee: ", selected, changeType, email);
    const promise = fetch(`http://localhost:5002/roster/update_type?id=${selected}&manager=${changeType}`); 
    const response = await promise;
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore)  queryRosterSummary()
    return () => { ignore = true; }
    },[]);

  const queryRosterSummary = async() => {
    const promise = fetch(`http://localhost:5002/roster/summary`); 
    const response = await promise;
    const result = await response.json();
    console.log(result);
    setRosterSummary(result);
  };

  const inputchangehandler = (event) => {
    setUserInput(event.target.value);
    console.log(userInput);
  }
  const emailHandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  }

  const addEmployee = async() => {
    const firstPromise = fetch(`http://localhost:5002/roster/nextID`); 
    const firstResponse = await firstPromise;
    const result = await firstResponse.json();
    var newID = result.nextID;
    console.log("submit button");
    console.log("userInput: ", userInput);
    console.log("type: ", type);
    console.log(result.nextID);
    console.log("inserting "+ userInput, newID, type);
    const promise = fetch(`http://localhost:5002/roster/add?id=${result.nextID}&name=${userInput}&manager=${type}`); 
    const response = await promise;
    setUserInput("");
    setType(0);
    console.log("Added: " + userInput + newID + type);
  }

  const addEmail = async() => {
    console.log("inserting "+ email);
    // const promise = fetch(`http://localhost:5002/roster/add?id=${result.nextID}&name=${userInput}&manager=${type}`); 
    // const response = await promise;
    setEmail("");
    // console.log("Added: " + userInput + newID + type);
  }

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
        { translations[2].translatedText }
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
        { translations[6].translatedText } 
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2> { translations[1].translatedText } </h2>
          <RosterDisplay rosterList={RosterSummary}/>
          <p></p>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2> { translations[2].translatedText } </h2>
          <hr />
              <label> { translations[3].translatedText }: </label>
              <input type="text" name="name" 
                    onChange={inputchangehandler} 
                    value = {userInput}/>
              <p></p>
              <label> { translations[4].translatedText }: </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="1"> { translations[12].translatedText } </option>
                <option value="0"> { translations[11].translatedText } </option>
              </select> 
              <p></p>
              <button className="SubmitButton" id="delete" onClick={() => addEmployee()}> { translations[5].translatedText } </button>
              <p>
              </p>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2> { translations[6].translatedText } </h2>
          <hr />
              <label> {translations[7].translatedText } </label>
              <RosterSelector 
                rosterList={RosterSummary}/>
              <p></p>

              <label> { translations[8].translatedText } : </label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
              >
                <option value="1">Manager</option>
                <option value="0">Regular Employee</option>
              </select>
              <p></p>
              <label> { translations[9].translatedText } : </label>
              <input type="text" email="email" 
                    onChange={emailHandler} 
                    value = {email}/>
              <p></p>
              <p></p>

              <button 
                className="SubmitButton" 
                id="delete" 
                onClick={() => deleteEmployee()} >
                { translations[10].translatedText } 
              </button>
              <button 
                className="SubmitButton" 
                id="update" 
                onClick={() => updateEmployee()} >
                { translations[5].translatedText } 
              </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTabs;
