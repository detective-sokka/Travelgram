import React from "react";
import { useEffect, useContext } from "react";
import { UserContext } from "../../../App";
import "./allsubscriptions.scss";
import R from "./R.jpg";
const cs = ["North America", "South America", "Asia", "Europe", "Africa"];
//the subscription is static , the user cannot create new subscription

const Allsubscriptions = () => {
  const { state } = useContext(UserContext);
  const joinbt = (index) => {
    console.log("clicked " + cs[index]);
    // add subscription to user (join the subscription)
    fetch("/addSubscription", {  //addCommunity
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        email: state.email,
        subscription: cs[index],
      }),
    }).then((res) => res.json());
  };

  useEffect(() => {
    fetch(`http://localhost:8080/allUsers`, {
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, []);

  return (
    <div className="tmp">
      <div class="container">
      <img src={R} className="img-fluid" alt=""/>
  <div class="overlay">{cs[0]}</div>
</div>
      {/* <div class="overlay">{cs[0]}</div>
        
        <div>
          {" "}
          <img src={R} className="img-thumbnail" alt=""/>
        </div> */}
        <div className="parent">
          <div className="child2">
            <button onClick={() => joinbt(0)}>Join </button>
          </div>
        </div>
    
      
        <div class="container">
      <img src={R} className="img-fluid" alt=""/>
  <div class="overlay">{cs[1]}</div>
</div>
        <div className="parent">          
          <div className="child2">
            <button onClick={() => joinbt(1)}>Join </button>
          </div>
        </div>
      
      
        <div class="container">
      <img src={R} className="img-fluid" alt=""/>
  <div class="overlay">{cs[2]}</div>
</div>
        <div className="parent">          
          <div className="child2">
            <button onClick={() => joinbt(2)}>Join </button>
          </div>
        </div>
      
      
        <div class="container">
      <img src={R} className="img-fluid" alt=""/>
  <div class="overlay">{cs[3]}</div>
</div>
        <div className="parent">        
          <div className="child2">
            <button onClick={() => joinbt(3)}>Join </button>
          </div>
        </div>
     
      
        <div class="container">
      <img src={R} className="img-fluid" alt=""/>
  <div class="overlay">{cs[4]}</div>
</div>
        <div className="parent">          
          <div className="child2">
            <button onClick={() => joinbt(4)}>Join </button>
          </div>
        </div>
      
    </div>
  );
};
export default Allsubscriptions;
