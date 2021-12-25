import { useState, useEffect } from "react";


export const API__Server__Req = (url,params) =>{
    var reponse,message;

   fetch(url, {
      method: "POST",
      mode: "no-cors",
      cache: "no-cache", 
      credentials: "same-origin",
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then(() => {
        console.log("new Segma added");
        reponse = true;
        message = 'Segma Added';
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("post aborted");
          reponse = false;
        } else {
            reponse = false;
            message = err.message;
          console.log(err.message);
        }
      });
    return {reponse,message};
}