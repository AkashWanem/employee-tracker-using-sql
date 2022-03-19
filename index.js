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

}