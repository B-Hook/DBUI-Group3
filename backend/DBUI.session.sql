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
VALUES  ('John', 'Doe', 'Neurological', 'surgeon', 'surgeon1', 'password'),
        ('Nader', 'Jalili', 'Ophthalmic', 'surgeon', 'surgeon2', 'password'),
        ('Gerald', 'Turner', 'Spine', 'surgeon', 'surgeon3', 'password'),
        ('Justin', 'Admin', '', 'admin', 'admin', 'password'),
        ('Jane', 'Doe', 'Oncology', 'surgeon', 'surgeon4', 'password'),
        ('James', 'Smith', 'Trauma Surgery', 'surgeon', 'surgeon5', 'password'),
        ('David', 'Johnson', 'Obstetrics and Gynecology', 'surgeon', 'surgeon6', 'password'),
        ('Emily', 'Wilson', 'Neurological', 'surgeon', 'surgeon7', 'password'),
        ('Michael', 'Anderson', 'Ophthalmic', 'surgeon', 'surgeon8', 'password'),
        ('Rachel', 'Lee', 'Spine', 'surgeon', 'surgeon9', 'password'),
        ('Robert', 'Wang', 'Oncology', 'surgeon', 'surgeon10', 'password'),
        ('Julia', 'Kang', 'Trauma Surgery', 'surgeon', 'surgeon11', 'password'),
        ('Daniel', 'Kim', 'Obstetrics and Gynecology', 'surgeon', 'surgeon12', 'password'),
        ('Sophia', 'Garcia', 'Neurological', 'surgeon', 'surgeon13', 'password'),
        ('Sarah', 'Davis', 'Ophthalmic', 'surgeon', 'surgeon14', 'password'),
        ('William', 'Lopez', 'Spine', 'surgeon', 'surgeon15', 'password'),
        ('Samantha', 'Martinez', 'Oncology', 'surgeon', 'surgeon16', 'password'),
        ('Ava', 'Gonzalez', 'Trauma Surgery', 'surgeon', 'surgeon17', 'password'),
        ('Andrew', 'Perez', 'Obstetrics and Gynecology', 'surgeon', 'surgeon18', 'password'),
        ('Ethan', 'Taylor', 'Neurological', 'surgeon', 'surgeon19', 'password'),
        ('Mia', 'Hernandez', 'Ophthalmic', 'surgeon', 'surgeon20', 'password'),
        ('David', 'Admin', '', 'admin', 'admin2', 'password'),
        ('Olivia', 'Garcia', 'Spine', 'surgeon', 'surgeon21', 'password'),
        ('Emma', 'Rodriguez', 'Oncology', 'surgeon', 'surgeon22', 'password');



CREATE TABLE surgeries(
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    surgeon_id              INT,
    patient_name            VARCHAR(255) NULL,
    staff_num               INT NOT NULL,
    month                   INT NOT NULL,
    day                     INT NOT NULL,
    time                    VARCHAR(255) NOT NULL,
    duration                INT NOT NULL,
    room_num                VARCHAR(255) NOT NULL,
    specialty               VARCHAR(255) NOT NULL,
    status                  VARCHAR(255) NOT NULL,
    notes                   VARCHAR(1000),
    CONSTRAINT fk_surgeon   FOREIGN KEY (surgeon_id) REFERENCES users(id)
);

INSERT INTO surgeries (surgeon_id, patient_name, staff_num, month, day, time, duration, room_num, specialty, status, notes)
VALUES  (1, 'Bob Smith', 3, 10, 4, 'Morning', 30, '1B', 'Rheumatology', 'pending', 'Nothing to note.'),
        (2, 'John Doe', 1, 10, 4, 'Afternoon', 30, '4B', 'Dermatology', 'accepted', 'Nothing to note.'),
        (3, 'First Last', 2, 10, 4, 'Evening', 120, '2A', 'Cardiology', 'pending', 'Nothing to note.');