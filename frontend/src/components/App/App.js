import './App.css';
import axios from 'axios';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Login from '../Login/Login';
import React, { useState } from 'react';


function App() {

  const url = 'http://localhost:8000'

  // const checkAPI = () => {
  //   axios.get(url + '/').then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const user = {
  //   "first": "Hayden",
  //   "last": "Center",
  //   "age": 22,
  //   "admin": true
  // }

  // const sendJSON = () => {
  //   console.log(user)

  //   axios.put(url + '/parse', user).then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const sendUser = () => {
  //   axios.post(url + '/user', user).then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const getUsers = () => {
  //   axios.get(url + '/users').then((res) => {
  //     alert(JSON.stringify(res.data))
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const clearUsers = () => {
  //   axios.put(url + '/users/clear').then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  
  const [token, setToken] = useState(getToken());

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <Header />
      <Home />
    </>
    // <div className="App">
    //   <h1>Hello World!</h1>
    //   <button onClick={checkAPI}>Check API</button>
    //   <button onClick={sendJSON}>Send JSON</button>
    //   <button onClick={sendUser}>Send User to DB</button>
    //   <button onClick={getUsers}>Get Users from DB</button>
    //   <button onClick={clearUsers}>Clear Users in DB</button>
    // </div>
  );
}

export default App;
