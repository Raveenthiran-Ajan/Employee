const mongoose = require('mongoose');
const readline = require('readline');
const Employee = require('./model/Employee.js');
  // Import your model

// Connect to MongoDB (replace <your_connection_string> with your actual URI)
mongoose.connect('mongodb://localhost:27017/MERN', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
    askQuestions();
  })
  .catch(err => {
    console.error('Connection error', err);
  });

// Setup readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestions() {
  let employeeData = {};

  rl.question('First Name: ', (firstName) => {
    employeeData.firstName = firstName;

    rl.question('Last Name: ', (lastName) => {
      employeeData.lastName = lastName;

      rl.question('Email: ', (email) => {
        employeeData.email = email;

        rl.question('Phone (numbers only): ', (phone) => {
          employeeData.phone = Number(phone);

          // Create new Employee document
          let newEmployee = new Employee(employeeData);

          // Save to DB
          newEmployee.save()
            .then(() => {
              console.log('Employee saved successfully!');
              rl.close();
              mongoose.connection.close();
            })
            .catch(err => {
              console.error('Error saving employee:', err);
              rl.close();
              mongoose.connection.close();
            });
        });
      });
    });
  });
}
