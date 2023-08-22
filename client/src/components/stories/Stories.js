import React, { useState, useEffect, useContext } from "react";
import "../../Css/home.scss";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Stories = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [dummyRerender, setDummyRerender] = useState(0);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/allstories", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("All stories", result);
        setData(result.posts);
      });
  }, [dummyRerender]);

  useEffect(() => {
    if (url) {
      fetch("/createstory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Created story successfully");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  useEffect(() => {
    if (image) {
      fetch("/createstory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: image,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Created story successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const [click, setClick] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [displayStatus, setDisplayStatus] = useState("none");

  const addNewStory = (file) => {
    const data = new FormData();
    data.append("file", file);
    console.log("Image", file);
    data.append("upload_preset", "Travelgram");
    data.append("cloud_name", "dislzfvur");
    fetch("https://api.Cloudinary.com/v1_1/dislzfvur/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
        setDummyRerender(dummyRerender + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setClickImage = (title) => {
    if (click == true) {
      if (imageLink != title) {
        setImageLink(title);
        return;
      }

      setClick(false);
      setImageLink("");
      setDisplayStatus("none");
    } else {
      setClick(true);
      setDisplayStatus("inline-block");
      setImageLink(title);
      console.log("set image src to ", title);
    }
  };

  const initEmphasis = (idx) => {
    document.getElementsByClassName("status-photo")[idx].style.width = "220px";
    document.getElementsByClassName("status-photo")[idx].style.height = "220px";
  };

  const endEmphasis = (idx) => {
    document.getElementsByClassName("status-photo")[idx].style.width = "200px";
    document.getElementsByClassName("status-photo")[idx].style.height = "200px";
  };

  return (
    <div className="container">
      <div className="container">
        <label className="custom-file-upload">
          <input
            type="file"
            className="file-button"
            onChange={(e) => addNewStory(e.target.files[0])}
          />
          <h1 className="plus"> + </h1>
        </label>
        {data.map((item, idx) => {
          return (
            <img
              src={item.title}
              className="status-photo"
              onClick={() => setClickImage(item.title)}
              onMouseOver={() => initEmphasis(idx)}
              onMouseOut={() => endEmphasis(idx)}
            />
          );
        })}
      </div>
      {
        <img
          src={imageLink}
          id="status-photo-lg"
          style={{ display: displayStatus }}
          className="img-thumbnail hidden-image"
        />
      }
    </div>
  );
};

export default Stories;
