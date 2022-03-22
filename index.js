// import dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// connect to database
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

// connects to sql server and sql database
db.connect((err) => {
  if (err) throw err;
  console.log("successfully connected to employees database");
  promptQuestions();
});

const promptQuestions = () => {
  inquirer
    .prompt({
      name: "select",
      type: "list",
      message: "What would yu like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update an employee manager",
        "View employees by department",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "View department budgets",
        "EXIT",
      ],
    })
    .then((answer) => {
      switch (answer.select) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee manager":
          updateManager();
          break;
        case "View employees by department":
          employeeDepartment();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "View department budget":
          viewBudget();
          break;
        default:
          db.end();
      }
    });
};

// function to view all departments
function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    consoleTable("All Departments:", res);
    promptQuestions();
  });
}

// function to view all roles
function viewRoles() {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    consoleTable("All roles:", res);
    promptQuestions();
  });
}

// function to view all employees
function viewEmployees() {
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) throw err;
    console.log(res.length + " employees found!");
    consoleTable("All Employees:", res);
    promptQuestions();
  });
}

// function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then((answer) => {
      db.query("INSERT INTO department SET ?", {
        name: answer.newDepartment,
      });
      const sql = "SELECT * FROM department";
      db.query(sql, (err, res) => {
        if (err) throw err;
        console.log("Your department has been added!");
        console.table("All Departments:", res);
        promptQuestions();
      });
    });
}

// function to add a role 
function addRole() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'How much is the salary for this role?'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    let deptArray = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArray.push(res[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                (err, res) => {
                    if(err)throw err;
                    console.log('New role has been added!');
                    console.table('All Roles:', res);
                    promptQuestions();
                })
        })
    })
};
