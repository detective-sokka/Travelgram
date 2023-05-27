import React from "react";
import CreatePost from "../../user/CreatePost";
import "./../../../Css/home.scss";
import "./mysubscriptions.scss";
import { Link } from "react-router-dom";

class Mysubscriptions extends React.Component {
  constructor(props) {
    //constructor set state from prop
    super(props);
    if (this.props.user) {
      this.state = {
        name: this.props.user.name,
        selected: 0,
        subscriptions: [],
        email: this.props.user.email,
        Pdata: [],
      };
    }
  }
  componentDidMount() {
    //get  subscriptions data from server
    if (this.state) {
      const web = "/getSubscription?email=" + this.state.email;  ///getCommunity?email=
      console.log(web);
      fetch(web, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((com) => {
          console.log("this is " + com.subscriptions);
          this.setState(com);
        });
    }
  }
  deleteC = (i) => {
    //send delete request to server
    fetch("/removeSubscription", {  ///removeCommunity
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        email: this.state.email,
        subscription: this.state.subscriptions[i],
      }),
    }).then((res) => res.json());
    const f = this.state.subscriptions.filter(function (value, index, arr) {
      return index != i;
    });
    console.log("f=" + f);
    this.setState({ subscriptions: f });
  };
  setSelect = (index) => {
    //select the subscriptions and get post data form server
    this.setState({ selected: index });
    console.log("clicked" + this.state.selected);
    const web2 = "/getCpost?subscription=" + this.state.subscriptions[index];  ///getCpost?community
    console.log(web2);
    fetch(web2, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("posts:", result.posts);
        this.setState({ Pdata: result.posts });
      });
  };
  //the following are helper functions from createpost.js
  likePost = (id) => {
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
        const newData = this.state.Pdata.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        //setData(newData)
        this.setState({ Pdata: newData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unlikePost = (id) => {
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
        const newData = this.state.Pdata.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        this.setState({ Pdata: newData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  makeComment = (text, postId) => {
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
        const newData = this.state.Pdata.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        this.setState({ Pdata: newData });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deletepost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = this.state.Pdata.filter((item) => {
          console.log(item._id, result._id);
          return item._id !== result._id;
        });
        this.setState({ Pdata: newData });
      });
  };

  render() {
    if (this.state) {
      return (
        <div className="parent">
          <h1> Hello {this.state.name}</h1>
          <div className="child_left">
            {this.state.subscriptions.map((c, index) => {
              return (
                <div>
                  <div
                    className=" subscriptions"
                    key={index}
                    onClick={() => this.setSelect(index)}
                  >
                    {" "}
                    {c}{" "}
                  </div>
                  <button
                    className="part1 btn_"
                    onClick={() => this.deleteC(index)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            <div>
              <CreatePost
                belongsTo={this.state.subscriptions[this.state.selected]}
              />
            </div>
          </div>
          <div className="child_right">
            <div className="home">
              {this.state.Pdata.map((item) => {
                return (
                  <div className="card home-card" key={item._id}>
                    <h5 style={{ padding: "5px" }}>
                      <Link
                        to={
                          item.postedBy._id !== this.props.user._id
                            ? "/profile/" + item.postedBy._id
                            : "/profile"
                        }
                      >
                        {item.postedBy.name}
                      </Link>
                      {item.postedBy._id === this.props.user._id && (
                        <i
                          className="material-icons"
                          style={{
                            float: "right",
                          }}
                          onClick={() => this.deletepost(item._id)}
                        >
                          delete
                        </i>
                      )}
                    </h5>
                    <div className="card-image">
                      <img src={item.photo} />
                    </div>
                    <div className="card-content">
                      <i className="material-icons" style={{ color: "red" }}>
                        favorite
                      </i>

                      {item.likes.includes(this.props.user._id) ? (
                        <i
                          className="material-icons"
                          onClick={() => {
                            this.unlikePost(this.props.user._id);
                          }}
                        >
                          thumb_down
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          onClick={() => {
                            this.likePost(item._id);
                          }}
                        >
                          thumb_up
                        </i>
                      )}

                      <h6>{item.likes.length} likes</h6>
                      <h6>{item.title}</h6>
                      <p>{item.body} </p>
                      {item.comments.map((record) => {
                        return (
                          <h6 key={record._id}>
                            <span style={{ fontWeight: "500" }}>
                              {record.postedBy.name}
                            </span>{" "}
                            : {record.text}
                          </h6>
                        );
                      })}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          this.makeComment(e.target[0].value, item._id);
                        }}
                      >
                        <input type="text" placeholder="add a commnet... " />
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  }
}
export default Mysubscriptions;
