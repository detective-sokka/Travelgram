import React, { useState, useEffect } from "react";
import "../../Css/home.scss";

const StoriesHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/allstories", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const [click, setClick] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [displayStatus, setDisplayStatus] = useState("none");

  const setClickImage = (title) => {
    if (click == true) {
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

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletepost = (postid) => {
    console.log(`/deletestories/${postid}`);
    fetch(`/deletestories/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          console.log(item._id, result._id);
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  const initEmphasis = (idx) => {
    document.getElementsByClassName("status-photo")[idx].style.width = "220px";
    document.getElementsByClassName("status-photo")[idx].style.height = "220px";
  }

  const endEmphasis = (idx) => {
    document.getElementsByClassName("status-photo")[idx].style.width = "200px";
    document.getElementsByClassName("status-photo")[idx].style.height = "200px";
  }

  return (
    <div className="container">
      <div className="home">
        <h1>hi</h1>
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
          style={{ display: displayStatus}}
          className="img-thumbnail w-20"
        />
      }
    </div>
  );
};

export default StoriesHome;
