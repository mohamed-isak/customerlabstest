import React, { useState, useEffect } from "react";
import Header from "./Header";
import { schemaVals, formDatas } from "./common/Common__data";
import {API__Server__Req} from "./common/API_Handle";

const Segment = () => {
  const [schemaValues, setShemaValues] = useState([]);
  const [segmentName, setSegementName] = useState([]);
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    account_name: "",
    city: "",
    state: "",
  });

  const [stateUpdate, setVal] = useState(0);
  const [errorMessage, seterrorMessage] = useState(0);
  var slectednewSchemeaopt;
  var eve;

  /***** State Update********* */
  useEffect(() => {
    console.log("State Update");
  }, [stateUpdate]);



  const changeHandler = (e) => {
    console.log(e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setVal(stateUpdate === 0 ? 1 : 0);
  };

  const addNewSchemeaVal = (e) => {
    e.preventDefault();
    const data = schemaValues;
    if (!data.includes(slectednewSchemeaopt.trim())) {
      data.push(slectednewSchemeaopt);
      setVal(stateUpdate === 0 ? 1 : 0);
      setShemaValues(data);
      eve.target.value = " Add schema to segment";
    } else {
      console.log("Already added");
    }

    console.log(schemaValues);
  };


  /********** Onsubmit Function  */
  const onSubmit = (e) => {
    e.preventDefault();
    var keys = Object.keys(formValues);
    var parseData = {
      segment_name: segmentName,
      schema: [
        { [keys[0]]: formValues.first_name },
        { [keys[1]]: formValues.last_name },
        { [keys[2]]: formValues.gender },
        { [keys[3]]: formValues.age },
        { [keys[4]]: formValues.account_name },
        { [keys[5]]: formValues.city },
        { [keys[6]]: formValues.state },
      ],
    };
   

    var [res,message] = API__Server__Req('https://webhook.site/',parseData);
    console.log(message);
    if(res)
    {
      closeNav();
      seterrorMessage(message);
      setVal(stateUpdate === 0 ? 1 : 0);
      showToast();
    }
    else
    {
      closeNav();
      seterrorMessage(message);
      setVal(stateUpdate === 0 ? 1 : 0);
      showToast();
    }

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
                        id="country"
                        name={item}
                        value={formValues[item]}
                        onChange={changeHandler}
                      >
                        {renderOption(item)}
                      </select>
                      <button className="btn__minus">&#x2212;</button>
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
                  slectednewSchemeaopt = e.target.value;
                  eve = e;
                  console.log(e.target.value);
                }}
              >
                <option value="australia" selected disabled>
                  Add schema to segment
                </option>
                {schemaVals.map((items, i) => {
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
              Save the Segement
            </button>
            <button className="btn__white">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

// <!------------ Dynamic Option Values ---------------->

function renderOption(param) {
  switch (param) {
    case "first_name":
      return (
        <>
          {formDatas[0].first_name.map((item, i) => {
            return i === 0 ? (
              <option value={item} disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );
    case "last_name":
      return (
        <>
          {formDatas[1].last_name.map((item, i) => {
            return i === 0 ? (
              <option value={item} selected disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );
    case "gender":
      return (
        <>
          {formDatas[2].gender.map((item, i) => {
            return i === 0 ? (
              <option value={item} selected disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );
    case "age":
      return (
        <>
          {formDatas[3].age.map((item, i) => {
            return i === 0 ? (
              <option value={item} selected disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );
    case "account_name":
      return (
        <>
          {formDatas[4].account_name.map((item, i) => {
            return i === 0 ? (
              <option value={item} selected disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );
    case "city":
      return (
        <>
          {formDatas[5].city.map((item, i) => {
            return i === 0 ? (
              <option value={item} selected disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );
    case "state":
      return (
        <>
          {formDatas[6].state.map((item, i) => {
            return i === 0 ? (
              <option value={item} selected disabled>
                {item}
              </option>
            ) : (
              <option value={item}>{item}</option>
            );
          })}
        </>
      );

    default:
      return "foo";
  }
}



// Access DOM Elements

function showToast() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
