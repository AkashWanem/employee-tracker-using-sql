// import dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

// connects to sql server and sql database
db.connect((err){
    if (err) throw err;
    console.log('successfully connected to employees database');
    promptQuestions();
});

const promptQuestions = () => {
    inquirer
        .prompt({
            name:'select',
            type: 'list',
            message: 'What would yu like to do?',
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Update an employee manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'EXIT'
            ]            
        }).then((answer) {
            switch (answer.select) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee manager':
                    updateManager();
                    break;
                case 'View employees by department':
                    employeeDepartment();
                    break;
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'View department budget':
                    viewBudget();
                    break;
                default:
                    db.end();
            }
        })
};