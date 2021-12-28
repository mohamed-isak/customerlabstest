import React, { useState, useEffect } from "react";
import Header from "./Header";
import { schemaVals } from "./common/Common__data";
import { API__Server__Req } from "./common/API_Handle";

const Segment = () => {
  const [schemaValues, setShemaValues] = useState([]);
  const [schemaKeys, setShemaKeys] = useState([]);
  const [segmentName, setSegementName] = useState([]);
  const [stateUpdate, setVal] = useState(0);
  const [errorMessage, seterrorMessage] = useState(0);
  const [btnText, setbtnText] = useState("Save the Segement");
  var slectednewSchemeaopt;
  var eve;

  /***** State Update********* */
  useEffect(() => {}, [stateUpdate]);

  // Filter arry
  function checkMatching(drpdata) {
    return !schemaValues.includes(drpdata.lable);
  }

  const addNewSchemeaVal = (e) => {
    e.preventDefault();
    const data = schemaValues;
    const keys = schemaKeys;
    if (!data.includes(slectednewSchemeaopt.trim())) {
      data.push(slectednewSchemeaopt);
      keys.push(eve.target.value);
      var sel = document.getElementById("schemaoption");
      sel.selectedIndex = 0;
      setVal(stateUpdate === 0 ? 1 : 0);
      setShemaValues(data);
      setShemaKeys(keys);
    } else {
      console.log("Already added");
    }

    console.log(schemaValues);
  };

  /********** Onsubmit Function  */
  const onSubmit = (e) => {
    e.preventDefault();
    var parseData = {
      segment_name: segmentName,
       schema: schemaKeys.map((item,i)=>{
         return {[item]:schemaValues[i]}
       }),
    };
    console.log(parseData);
    setbtnText('Loading...');
    var res = API__Server__Req(
      "https://webhook.site/6be7d72d-75cf-42b2-b2db-11f4416003f8",
      parseData
    );
    
    setTimeout(()=>{
      console.log(res);
    if (res) {
      closeNav();
      setShemaValues([]);
      setShemaKeys([]);
      setbtnText('Save the Segement');
      seterrorMessage("New Segma added");
      setVal(stateUpdate === 0 ? 1 : 0);
      showToast();
    } else {
      closeNav();
      setbtnText('Save the Segement');
      seterrorMessage("Error");
      setVal(stateUpdate === 0 ? 1 : 0);
      showToast();
    }
    },[2000])
  };

  // *******************UI Render*******************

  return (
    <>
      <button className="btn__outline" onClick={openNav}>
        Save Segment
      </button>
      <div id="mySidenav" className="sidenav">
        <Header headerText="Saving Segment" closenav={closeNav}></Header>

        <form className="sidnav__Form">
          <p className="formLable">Enter the name of the segment</p>
          <input
            type="text"
            id="fname"
            name="segment_name"
            value={segmentName}
            placeholder="Name of the segment"
            onChange={(e) => {
              setSegementName(e.target.value);
            }}
          />

          <p className="segment__message">
            To save your segment. You need to add the schemas to build the query
          </p>

          <div className="Traites">
            <p className="first__traites">
              <span className="clr__dot1" style={{ alignSelf: " " }}>
                &#11044;
              </span>{" "}
              - User Traits
            </p>
            <p>
              <span className="clr__dot2" style={{ alignSelf: " " }}>
                &#11044;
              </span>{" "}
              - Group Traits
            </p>
          </div>

          {schemaValues.length !== 0 ? (
            <div className="form__Fields__dowpdown">
              {schemaValues.map((item, i) => {
                return (
                  <>
                    <div className="form__Fieldws_Row">
                      <span className="clr__dot1">&#11044;</span>
                      <select
                        id={`forrmval${i}`}
                        name={schemaKeys[i]}
                        value="mohamed isak"
                        onChange={(e) => {
                          var sel = document.getElementById(`forrmval${i}`);
                          schemaKeys[i] = sel.options[sel.selectedIndex].value;
                          schemaValues[i] = sel.options[sel.selectedIndex].text;
                          setVal(stateUpdate === 0 ? 1 : 0);
                        
                        }}
                      >
                        <option name={schemaKeys[i]}>{item}</option>
                        {/* {renderOption(item)} */}
                        {schemaVals.filter(checkMatching).map((items) => {
                          return (
                            <option
                              key={items.id}
                              value={items.value}
                            >
                              {items.lable}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        className="btn__minus"
                        onClick={(e) => {
                          e.preventDefault();
                          schemaValues.splice(i, 1);
                          schemaKeys.splice(i,1);
                          setVal(stateUpdate === 0 ? 1 : 0);
                        }}
                      >
                        &#x2212;
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <p className="Error__Message">No Form Values</p>
          )}

          {/* <!-------- Add segment Field selector-------> */}

          <div className="form__field__dropdwn__val">
            <div className="form__Fieldws_Row">
              <span className="clr__dot1">&#11044;</span>
              <select
                id="schemaoption"
                name="New schema"
                value={schemaValues.value}
                onChange={(e) => {
            
                  var sel = document.getElementById("schemaoption");
                  console.log(sel.selectedIndex);
                  var text = sel.options[sel.selectedIndex].text;
                  slectednewSchemeaopt = text;
                  eve = e;
                  console.log(e.target.value);
                }}
              >
                <option value="default" selected disabled>
                  Add schema to segment
                </option>
                {schemaVals.filter(checkMatching).map((items, i) => {
                  return (
                    <>
                      <option value={items.value}>{items.lable}</option>
                    </>
                  );
                })}
              </select>
              <button className="btn__minus">&#x2212;</button>
            </div>
          </div>

          <a
            className="form__add__Schema__link"
            href="#"
            onClick={addNewSchemeaVal}
          >
            +Add new schema
          </a>
          <div id="snackbar">{errorMessage}</div>
          {/* <!-------Nav Footer -------> */}

          <div className="sidenav_Footer">
            <button className="btn__primary" onClick={onSubmit}>
              {btnText}
            </button>
            <button className="btn__white" onClick={closeNav}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


// Access DOM Elements

function showToast() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function openNav() {
  document.getElementById("mySidenav").style.width = "450px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "white";
}

export default Segment;
