require('./models/db')

const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')

const employeecontroller = require('./controllers/employeecontroller')

var app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.send(`<h2>Welcome to Employee Data</h2>
    <h3>Click here --><a href="employee/list">Get Details</a></h3>`)
})
app.set('views', path.join(__dirname, '/views'))
app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutDir: __dirname + '/views/layouts/'
}))
app.set('view engine', 'hbs');

app.listen(3001, () => {
    console.log('server started at port 3001')
})

app.use('/employee', employeecontroller)