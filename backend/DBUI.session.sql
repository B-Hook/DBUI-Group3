drop database DBUI;
CREATE DATABASE DBUI;
USE DBUI;

CREATE TABLE users (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    username            VARCHAR(255) NOT NULL,
    password            VARCHAR(255) NOT NULL,
    type                VARCHAR(255) NOT NULL,
    specialty           VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, specialty, type, username, password) 
VALUES  ('John', 'Doe', 'Rheumatology', 'surgeon', 'surgeon1', 'password'),
        ('Nader', 'Jalili', 'Cardiology', 'surgeon', 'surgeon2', 'password'),
        ('Gerald', 'Turner', 'Dermatology', 'surgeon', 'surgeon3', 'password'),
        ('Justin', 'Admin', '', 'admin', 'admin', 'password');

CREATE TABLE surgeries(
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    surgeon_id              INT NOT NULL,
    patient_name            VARCHAR(255) NULL,
    support_staff_number    INT NOT NULL,
    date                    date NOT NULL,
    time                    time NOT NULL,
    duration                time NOT NULL,
    location                VARCHAR(255) NOT NULL,
    specialty               VARCHAR(255) NOT NULL,
    CONSTRAINT fk_surgeon   FOREIGN KEY (surgeon_id) REFERENCES users(id),
);

INSERT INTO surgeries (surgeon_id, patient_name, support_staff_number, date, time, duration, location, specialty)
VALUES  (1, 'Bob Smith', 3, '2023/10/04', '4:00:00', '00:30:00', 'Patient Room', 'Rheumatology'),
        (2, 'John Doe', 1, '2023/10/04', '4:30:00', '00:30:00', 'Patient Room', 'Dermatology'),
        (3, 'First Last', 2, '2023/10/04', '4:30:00', '02:00:00', 'Operating Room', 'Cardiology');