CREATE DATABASE IF NOT EXISTS DBGUI;
USE DBGUI;
CREATE TABLE IF NOT EXISTS Surgeons(
  surgeon_id INT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  specialty VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Administrator(
    admin_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS SupportStaff(
    staff_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS Patients (
    pid INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    medical_condition VARCHAR(50) NOT NULL,
    medical_history VARCHAR(50) NOT NULL,
    PRIMARY KEY (pid)
);
CREATE TABLE IF NOT EXISTS Surgeries (
    sid INT PRIMARY KEY ,
    surgeon_id INT NOT NULL,
    patient_id INT NOT NULL,
    support_staff_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    FOREIGN KEY (surgeon_id) REFERENCES Surgeons(surgeon_id),
    FOREIGN KEY (patient_id) REFERENCES Patients(pid),
    FOREIGN KEY (support_staff_id) REFERENCES SupportStaff(staff_id)
);







