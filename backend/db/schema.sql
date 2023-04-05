# CREATE DATABASE Lab;

CREATE TABLE Users(
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Surgeons(
  specialty VARCHAR(100) NOT NULL,
  username VARCHAR(100) PRIMARY KEY,
  FOREIGN KEY(username) REFERENCES Users(username)
);

CREATE TABLE Administrator(
#     admin_id INT PRIMARY KEY,
    username VARCHAR(100) PRIMARY KEY,
  FOREIGN KEY(username) REFERENCES Users(username)
);

CREATE TABLE SupportStaff(
    staff_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE Surgeries (
    sid INT PRIMARY KEY ,
    surgeon_username VARCHAR(100) NOT NULL,
    patient_id INT NOT NULL,
    support_staff_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    FOREIGN KEY (surgeon_username) REFERENCES Surgeons(username),
    FOREIGN KEY (patient_id) REFERENCES Patients(pid),
    FOREIGN KEY (support_staff_id) REFERENCES SupportStaff(staff_id)
);

CREATE TABLE Patients (
    pid INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    medical_condition VARCHAR(50) NOT NULL,
    medical_history VARCHAR(50) NOT NULL,
    PRIMARY KEY (pid)
);


# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CoolPasswordThanks';
#
# flush privileges;