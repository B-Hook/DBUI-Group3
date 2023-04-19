import './App.css';
import { Surgeries } from '../Home/Surgeries'
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

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
    },
    {
      id: 3453678,
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

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Surgeries list={list}/>}/>
    </Routes>
  </BrowserRouter>;
}

export default App;