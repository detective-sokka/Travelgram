import React from "react";
import { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import "./Css/favourites.scss";
import "./Css/activity.scss";
import "./Css/feed.scss";
import "./Css/guide.scss";
import "./Css/likes.scss";
import "./Css/story.scss";
import "./Css/home.scss";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Front from "./components/screens/Front";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import Profile from "./components/user/Profile";
import Home from "./components/screens/Home";
import AdminHome from "./components/screens/AdminHome";
import CreatePost from "./components/user/CreatePost";
import CreateStories from "./components/stories/CreateStories";
import Stories from "./components/stories/Stories";
import AboutUs from "./components/screens/About";
import UserProfile from "./components/user/UserProfile";
import { reducer, initialState } from "./reducers/userReducer.js";
import SubscribedUserPosts from "./components/user/SubscribesUserPosts";
import Allsubscriptions from "./components/screens/subscriptions/Allsubscriptions";
import Mysubscriptions from "./components/screens/subscriptions/Mysubscriptions";
import 'bootstrap/dist/css/bootstrap.css';


export const UserContext = createContext();

const Routing = () => {

  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user obj app.js", user);
    if (user) {

      dispatch({ type: "USER", payload: user });      

    } else {
      
      navigate("/front");
    }
  }, []);
  
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/front" element={<Front />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createstory" element={<CreateStories />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost belongsTo={"Global"} />} />
      <Route path="/mysubscriptions" element={<Mysubscriptions user={state} />} />
      <Route path="/allsubscriptions" element={<Allsubscriptions />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" element={<SubscribedUserPosts />} />
      <Route path="/adminhome" element={<AdminHome />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
