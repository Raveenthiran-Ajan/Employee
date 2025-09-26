const express = require('express');
const employeeRoutes = express.Router();  // Router for routes

const employeeModel = require('../model/Employee.js');  // Mongoose model

// Define a GET route on the router
employeeRoutes.route('/').get(async function(req, res) {
    try {
        const employees = await employeeModel.find();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
employeeRoutes.route('/').post(async function(req, res) {
    try {
        const newEmployee = new employeeModel(req.body);
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error saving employee");
    }
});

module.exports = employeeRoutes;  // Export the router
