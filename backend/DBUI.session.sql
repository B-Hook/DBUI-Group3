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
        ('Justin', 'Admin', '', 'admin', 'admin', 'password'),
        ('Jane', 'Doe', 'Rheumatology', 'surgeon', 'surgeon4', 'password'),
        ('James', 'Smith', 'Cardiology', 'surgeon', 'surgeon5', 'password'),
        ('David', 'Johnson', 'Dermatology', 'surgeon', 'surgeon6', 'password'),
        ('Emily', 'Wilson', 'Neurology', 'surgeon', 'surgeon7', 'password'),
        ('Michael', 'Anderson', 'Ophthalmology', 'surgeon', 'surgeon8', 'password'),
        ('Rachel', 'Lee', 'Orthopedics', 'surgeon', 'surgeon9', 'password'),
        ('Robert', 'Wang', 'Plastic Surgery', 'surgeon', 'surgeon10', 'password'),
        ('Julia', 'Kang', 'Psychiatry', 'surgeon', 'surgeon11', 'password'),
        ('Daniel', 'Kim', 'Radiology', 'surgeon', 'surgeon12', 'password'),
        ('Sophia', 'Garcia', 'Urology', 'surgeon', 'surgeon13', 'password'),
        ('Sarah', 'Davis', 'Allergy and Immunology', 'surgeon', 'surgeon14', 'password'),
        ('William', 'Lopez', 'Anesthesiology', 'surgeon', 'surgeon15', 'password'),
        ('Samantha', 'Martinez', 'Endocrinology', 'surgeon', 'surgeon16', 'password'),
        ('Ava', 'Gonzalez', 'Gastroenterology', 'surgeon', 'surgeon17', 'password'),
        ('Andrew', 'Perez', 'Hematology', 'surgeon', 'surgeon18', 'password'),
        ('Ethan', 'Taylor', 'Infectious Disease', 'surgeon', 'surgeon19', 'password'),
        ('Mia', 'Hernandez', 'Nephrology', 'surgeon', 'surgeon20', 'password'),
        ('David', 'Admin', '', 'admin', 'admin2', 'password'),
        ('Olivia', 'Garcia', 'Oncology', 'surgeon', 'surgeon21', 'password'),
        ('Emma', 'Rodriguez', 'Pulmonology', 'surgeon', 'surgeon22', 'password');


CREATE TABLE surgeries(
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    surgeon_id              INT NOT NULL,
    patient_name            VARCHAR(255) NULL,
    staff_num               INT NOT NULL,
    month                   INT NOT NULL,
    day                     INT NOT NULL,
    time                    VARCHAR(255) NOT NULL,
    duration                INT NOT NULL,
    room_num                VARCHAR(255) NOT NULL,
    specialty               VARCHAR(255) NOT NULL,
    status                  VARCHAR(255) NOT NULL,
    notes                   VARCHAR(1000) NOT NULL,
    CONSTRAINT fk_surgeon   FOREIGN KEY (surgeon_id) REFERENCES users(id)
);

INSERT INTO surgeries (surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, status, notes)
VALUES  (1, 'Bob Smith', 3, 10, 4, 'Morning', 30, '1B', 'Rheumatology', 'pending', 'Nothing to note.'),
        (2, 'John Doe', 1, 10, 4, 'Afternoon', 30, '4B', 'Dermatology', 'accepted', 'Nothing to note.'),
        (3, 'First Last', 2, 10, 4, 'Evening', 120, '2A', 'Cardiology', 'pending', 'Nothing to note.');