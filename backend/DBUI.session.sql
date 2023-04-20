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
        ('Olivia', 'Garcia', 'Spine', 'surgeon', 'surgeon21', 'password'),
        ('Emma', 'Rodriguez', 'Oncology', 'surgeon', 'surgeon22', 'password'),
        ('David', 'Admin', '', 'admin', 'admin2', 'password'),
        ('Justin', 'Admin', '', 'admin', 'admin', 'password');



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
VALUES  (1, 'Alice Brown', 3, 3, 12, 'Morning', 60, '1A', 'Neurological', 'pending', 'Follow-up in 2 weeks.'),
        (2, 'Mary Johnson', 2, 6, 21, 'Afternoon', 45, '2B', 'Ophthalmic', 'accepted', 'Prescribe eye drops after surgery.'),
        (3, 'Charles Smith', 1, 11, 15, 'Morning', 90, '3A', 'Spine', 'pending', 'Schedule physical therapy post-surgery.'),
        (4, 'Linda Wilson', 4, 5, 19, 'Afternoon', 75, '4A', 'Oncology', 'accepted', 'Follow up with radiologist.'),
        (5, 'Thomas Lee', 3, 8, 26, 'Morning', 120, '5B', 'Trauma Surgery', 'pending', 'Schedule follow-up appointment in 1 week.'),
        (6, 'Carolyn Davis', 2, 10, 2, 'Afternoon', 90, '6A', 'Obstetrics and Gynecology', 'accepted', 'Schedule postpartum appointment.'),
        (7, 'George Green', 2, 2, 13, 'Morning', 100, '7B', 'Neurological', 'accepted', 'Review medications list for possible interactions.'),
        (8, 'Laura Moore', 3, 9, 7, 'Afternoon', 60, '8A', 'Ophthalmic', 'pending', 'Ensure proper eye care is provided post-surgery.'),
        (9, 'Walter Thompson', 1, 4, 28, 'Morning', 80, '9B', 'Spine', 'accepted', 'Coordinate with patients primary care physician.'),
        (10, 'Jennifer Clark', 3, 7, 21, 'Afternoon', 50, '10A', 'Oncology', 'pending', 'Discuss treatment options and side effects with the patient.'),
        (11, 'Henry Turner', 2, 1, 16, 'Morning', 40, '11B', 'Trauma Surgery', 'accepted', 'Monitor vitals closely during surgery.'),
        (12, 'Michelle Lewis', 1, 12, 8, 'Afternoon', 45, '12A', 'Obstetrics and Gynecology', 'pending', 'Review postoperative care with patient.'),
        (13, 'Stephen Robinson', 3, 3, 29, 'Morning', 90, '1C', 'Neurological', 'accepted', 'Schedule follow-up appointment in 1 month.'),
        (14, 'Anna Williams', 2, 5, 18, 'Afternoon', 30, '2C', 'Ophthalmic', 'pending', 'Discuss rehabilitation options with the patient.'),
        (15, 'Mark Jackson', 1, 8, 10, 'Morning', 120, '3B', 'Spine', 'accepted', 'Provide patient with postoperative care instructions.'),
        (1, 'Benjamin Foster', 3, 7, 23, 'Afternoon', 60, '1D', 'Neurological', 'pending', 'Monitor for any postoperative complications.'),
        (2, 'Natalie Young', 2, 11, 3, 'Morning', 45, '2D', 'Ophthalmic', 'accepted', 'Provide patient with protective eyewear.'),
        (3, 'Kevin Martin', 1, 1, 22, 'Afternoon', 90, '3C', 'Spine', 'pending', 'Ensure patient completes preoperative testing.'),
        (4, 'Alicia King', 4, 9, 14, 'Morning', 75, '4B', 'Oncology', 'accepted', 'Coordinate with oncology team.'),
        (5, 'Anthony Wright', 3, 4, 20, 'Afternoon', 120, '5A', 'Trauma Surgery', 'pending', 'Ensure proper wound care is provided.'),
        (6, 'Denise Harris', 2, 6, 7, 'Morning', 90, '6B', 'Obstetrics and Gynecology', 'accepted', 'Coordinate with patients primary care physician.'),
        (7, 'Raymond Nelson', 2, 10, 17, 'Afternoon', 100, '7A', 'Neurological', 'pending', 'Schedule follow-up appointment in 2 weeks.'),
        (8, 'Diane Taylor', 3, 2, 27, 'Morning', 60, '8B', 'Ophthalmic', 'accepted', 'Monitor patients vision closely after surgery.'),
        (9, 'Juan White', 1, 5, 13, 'Afternoon', 80, '9A', 'Spine', 'pending', 'Ensure patient completes physical therapy.'),
        (10, 'Megan Walker', 3, 8, 12, 'Morning', 50, '10B', 'Oncology', 'accepted', 'Discuss ongoing treatment plan with the patient.'),
        (11, 'Oliver Perez', 2, 3, 21, 'Afternoon', 40, '11A', 'Trauma Surgery', 'pending', 'Monitor patient for signs of infection.'),
        (12, 'Sandra Hall', 1, 7, 5, 'Morning', 45, '12B', 'Obstetrics and Gynecology', 'accepted', 'Schedule postoperative follow-up appointment.'),
        (13, 'Harold Rivera', 3, 12, 9, 'Afternoon', 90, '1E', 'Neurological', 'pending', 'Monitor patients medications closely.'),
        (14, 'Marie Gonzalez', 2, 1, 28, 'Morning', 30, '2E', 'Ophthalmic', 'accepted', 'Review postoperative care instructions with patient.'),
        (15, 'Eugene Scott', 1, 9, 16, 'Afternoon', 120, '3D', 'Spine', 'pending', 'Coordinate with the patients primary care physician.'),
        (16, 'Gloria Morris', 3, 4, 10, 'Morning', 80, '11B', 'Oncology', 'accepted', 'Discuss radiation therapy options with the patient.'),
        (17, 'Dennis Bryant', 2, 2, 15, 'Afternoon', 90, '12A', 'Trauma Surgery', 'pending', 'Provide patient with detailed postoperative care instructions.'),
        (18, 'Christina Russell', 1, 6, 19, 'Morning', 60, '13B', 'Obstetrics and Gynecology', 'accepted', 'Ensure patient completes prenatal care.'),
        (19, 'Gregory Watson', 3, 10, 30, 'Afternoon', 100, '14A', 'Neurological', 'pending', 'Schedule a follow-up appointment to assess recovery.'),
        (20, 'Janet Simmons', 2, 9, 29, 'Morning', 45, '15B', 'Ophthalmic', 'accepted', 'Remind patient to avoid straining their eyes.'),
        (21, 'Terry Coleman', 1, 5, 6, 'Afternoon', 75, '16A', 'Spine', 'pending', 'Ensure the patient receives proper pain management.'),
        (22, 'Frances Hayes', 3, 7, 24, 'Morning', 90, '17B', 'Oncology', 'accepted', 'Discuss chemotherapy options with the patient.'),
        (16, 'Laura Torres', 3, 12, 8, 'Afternoon', 120, '11C', 'Oncology', 'pending', 'Coordinate care with the patients oncologist.'),
        (17, 'Marilyn Ramirez', 2, 8, 15, 'Morning', 40, '12C', 'Trauma Surgery', 'accepted', 'Monitor patient for signs of infection.'),
        (18, 'Samuel Price', 1, 3, 28, 'Afternoon', 70, '13C', 'Obstetrics and Gynecology', 'pending', 'Coordinate with the patients obstetrician.');
        (NULL, 'Arthur Bennett', 2, 3, 14, 'Morning', 90, '18B', 'Obstetrics and Gynecology', 'No Surgeon', 'Seeking an available surgeon for this procedure.'),
        (4, 'Cynthia Morgan', 1, 5, 22, 'Afternoon', 120, '19A', 'Oncology', 'Rejected', 'Surgery rejected due to insufficient diagnostic information.'),
        (NULL, 'Danielle Brooks', 3, 8, 7, 'Morning', 60, '20B', 'Trauma Surgery', 'No Surgeon', 'In need of a trauma surgeon for this case.'),
        (9, 'Edward Alvarez', 2, 6, 16, 'Afternoon', 45, '21A', 'Spine', 'Rejected', 'Surgery rejected due to contraindications.'),
        (NULL, 'Fiona Long', 1, 11, 30, 'Morning', 75, '22B', 'Spine', 'No Surgeon', 'Looking for a spine surgeon for this patient.'),
        (19, 'Grace Newman', 3, 10, 25, 'Afternoon', 100, '23A', 'Neurological', 'Rejected', 'Surgery rejected due to high-risk factors.'),
        (NULL, 'Hannah Kelly', 2, 4, 4, 'Morning', 90, '24B', 'Oncology', 'No Surgeon', 'Seeking an oncologist for this case.'),
        (20, 'Isaac Jordan', 1, 7, 19, 'Afternoon', 60, '25A', 'Ophthalmic', 'Rejected', 'Surgery rejected due to better non-surgical alternatives.');
