import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/createpost.scss";

const CreatePost = ({ belongsTo }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
          belong: belongsTo,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Created post successfully");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    console.log("Image", image);
    data.append("upload_preset", "Insta-clone");
    data.append("cloud_name", "dtvusjwdx");
    fetch("https://api.Cloudinary.com/v1_1/dtvusjwdx/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        
        setUrl(data.url);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card input-filed w-40 create-card">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #42a5f5 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>  
      <button
        class="btn waves-effect waves-light #42a5f5 blue darken-1"
        onClick={() => postDetails()}
      >
        Submit
      </button>
    </div>
  );
};
//dtvusjwdx
export default CreatePost;
