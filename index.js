const { prompt } = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employees'
    },
    console.log(`Connected to the employees database.`)
  ).promise;

  const mainMenu = async () => {
    const { choice } = await prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name:'View All Employees',
                    value:'VIEW_EMPLOYEES'
                },
                {
                    name:'View All Departments',
                    value:'VIEW_DEPARTMENTS' 
                }
            ]
        }
    ])
switch (choice) {
    case 'VIEW_EMPLOYEES':
        viewEmployees()
        break;
    case 'VIEW_DEPARTMENTS':
        // do something
        break;
    case 'EXIT':
        process.exit();
        break;
    default:
        process.exit();
}

  }


  const viewEmployees = async () => {
    const [employeeData] = await db.query("SELECT * FROM employee", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    console.table(employeeData);
    mainMenu()
  };

  const viewDepartments = () => {

  }


  mainMenu();