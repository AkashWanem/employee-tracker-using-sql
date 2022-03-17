INSERT INTO department (name)
VALUES ('Information Technology'),
       ('Human Resources'),
       ('Finance'),
       ('Engineers'),
       ('Sales & Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Full-stack Developer', 45000, 1),
       ('Adminstrator', 30000, 2),
       ('Accountant', 40000, 3),
       ('Mechanical Engineer' 35000, 4),
       ('Sales Rep', 26000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Akash', 'Limbu', 1, 553),
       ('Keshar', 'Chongbang', 2, 143),
       ('Eshamu', 'Patangwa', 3, 785),
       ('Misan', 'Kurumbang', 4, 961),
       ('Kabir', 'Libang', 5, 420);