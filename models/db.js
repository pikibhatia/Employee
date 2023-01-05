const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Employee', {
    useNewUrlParser: true
},
    err => {
        if (!err) {
            console.log('connection succeeded')
        } else {
            console.log('Error in connection' + err)
        }
    })

require('./employee.model')