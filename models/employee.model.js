const mongoose = require('mongoose')
var employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    jobTitle: {
        type: String,
        required: 'JobTitle is required'
    },
    emailID: {
        type: String,
        required: 'EmailID is required'
    }
})

mongoose.model('Employee', employeeSchema)