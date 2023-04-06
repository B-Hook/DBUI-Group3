drop database DBUI;
CREATE DATABASE DBUI;
USE DBUI;

CREATE TABLE surgeons(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    username            VARCHAR(255) NOT NULL,
    password            VARCHAR(255) NOT NULL,
    specialty           VARCHAR(255) NOT NULL
);

INSERT INTO surgeons (first_name, last_name, specialty, username, password) 
VALUES  ('John', 'Doe', 'Rheumatology', 'surgeon1', 'password'),
        ('Nader', 'Jalili', 'Cardiology', 'surgeon2', 'password'),
        ('Gerald', 'Turner', 'Dermatology', 'surgeon3', 'password');

CREATE TABLE administrators(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    username            VARCHAR(255) NOT NULL,
    password            VARCHAR(255) NOT NULL
);

INSERT INTO administrators (first_name, last_name, username, password) 
VALUES  ('Justin', 'Admin', 'admin', 'password');

CREATE TABLE support_staff(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    role                VARCHAR(255) NOT NULL
);

INSERT INTO support_staff (first_name, last_name, role) 
VALUES  ('Sue', 'Porter', 'Nurse'),
        ('Weare', 'Elpers', 'Nurse'),
        ('Saint', 'Aff', 'Nurse');

CREATE TABLE patients(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(255) NOT NULL,
    last_name           VARCHAR(255) NOT NULL,
    medical_conditions  VARCHAR(255) NOT NULL,
    medical_history     VARCHAR(255) NOT NULL
);

INSERT INTO patients (first_name, last_name, medical_conditions, medical_history)
VALUES  ('Bhad', 'Backman', 'Back Pain', 'Arthritis'),
        ('Lar', 'Grash', 'Multiple Rashes', 'Dermatitis'),
        ('Scar', 'Eheart', 'Heart Attack', 'Multiple Heart Attacks');

CREATE TABLE surgeries(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    surgeon_id          INT NOT NULL,
    patient_id          INT NOT NULL,
    support_staff_id    INT NOT NULL,
    date                date NOT NULL,
    time                time NOT NULL,
    duration            time NOT NULL,
    location            VARCHAR(255) NOT NULL,
    specialty           VARCHAR(255) NOT NULL,
    CONSTRAINT fk_surgeon FOREIGN KEY (surgeon_id) REFERENCES surgeons(id),
    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id),
    CONSTRAINT fk_support_staff FOREIGN KEY (support_staff_id) REFERENCES support_staff(id)
);

INSERT INTO surgeries (surgeon_id, patient_id, support_staff_id, date, time, duration, location, specialty)
VALUES  (1, 1, 3, '2023/10/04', '4:00:00', '00:30:00', 'Patient Room', 'Rheumatology'),
        (2, 3, 1, '2023/10/04', '4:30:00', '00:30:00', 'Patient Room', 'Dermatology'),
        (3, 2, 2, '2023/10/04', '4:30:00', '02:00:00', 'Operating Room', 'Cardiology');