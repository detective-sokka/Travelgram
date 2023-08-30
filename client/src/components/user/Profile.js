import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import "../../Css/profile.scss";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);

  var displayStyle = {
    display: state.premium ? "inline-block" : "none",
  };

  return (
    <div className="max-w-[550px] mx-0 my-auto">
      <div className="flex content-around mx-4 my-0 border-[1px] border-gray-500">
        <div>
          <img className="w-[160px] h-[160px] rounded-[80px]" alt='warning gone' src={require("../../../src/egg.png")} />
        </div>
        <div>
          <h4>
            {state ? state.name : "loading"}
            <i className="material-icons" style={displayStyle}>
              check
            </i>
          </h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div className="flex content-around w-[108%]">
            <h6>{mypics.length} posts</h6>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap content-around">
        {mypics.map((item) => {
          return <img className="w-[30%]" src={item.photo} alt={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
