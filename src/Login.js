import "./App.css";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  orderByKey,
  query,
} from "firebase/database";
import firebase from "./myfirebase";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(users);
    if (
      users.some(
        (data) => data.username == user.name && data.password == user.password
      )
    ) {
      //   alert("Login Success");
      navigate(`/dashboard/${user.name}`);
    } else {
      alert("Invalid Credentials");
    }
  };

  const fetchData = () => {
    const db = getDatabase();
    const usersRef = ref(db, "customers/");
    onValue(usersRef, (snapshot) => {
      const newData = [];
      snapshot.forEach((item) => {
        let username = item.key;
        let password;
        const userRef = ref(db, "customers/" + item.key);
        onValue(userRef, (snap) => {
          password = snap.val().password;
        });
        newData.push({ username: username, password: password });
        setUsers(newData);
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Please Login to your Account</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="name">
              <label>Username</label>
            </div>
            <div className="input">
              <input
                type="text"
                value={user.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          {/* <br /> */}
          <div className="field">
            <div className="name">
              <label>Password</label>
            </div>
            <div className="input">
              <input
                type="password"
                value={user.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
