import './App.css';
import axios from 'axios';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { Surgeries } from '../Home/Surgeries'
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

  const list = [
    {
      id: 123456,
      surgeon_id: 1,
      patient_name: 1,
      staff_num: 1,
      date: "4/12/2023",
      time: "11:00",
      duration: "3 hours",
      location: "456",
      state: "accepted"
    },
    {
      id: 234567,
      surgeon_id: 2,
      patientID: 2,
      supportStaffID: 2,
      date: "4/12/2023",
      time: "12:00",
      duration: "3 hours",
      location: "456",
      state: "rejected"
    },
    {
      id: 345678,
      surgeonID: 3,
      patientID: 3,
      supportStaffID: 3,
      date: "4/12/2023",
      time: "11:00",
      duration: "3 hours",
      location: "456",
      state: "pending"
    }
  ]

  if (!token) {
      return <>
        <Header />
        <Surgeries list={list}/>
      </>
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
