const express = require('express');

const app = express();
const employeeRoute = express.Router();

let employeeModel = require('../model/Employee');

employeeModel.route('/').get(async function(req,res){
    try{
        const employees = await employeeModel.find();
        res.json(employees);
    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

