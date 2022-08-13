const express = require('express')
const app = express()
const PORT = 8500;
const mongoose = require('mongoose');
//Use env to add protection to the Mongo connection string: 
require('dotenv').config()
//add model variable "CapaReports" that was declared in capareport.js
const CapaReport = require('./models/capareport.js')

//Declare middlewares (move traffic to and from front-end to endpoints)
app.set("view engine","ejs") //using ejs for our view engine. Located in views directory
app.use(express.static('public')) //Express will refer to the public folder. Stylesheet goes in public.
app.use(express.urlencoded({extended: true})) //helps validate info we are moving back-forth. Extended allows us to pass complex data such as arrays and objects

//tell mongoose to pull data from the env file
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log("Connected to Mongo Database!")}
 )

//GET-request method to render the page (route '/'):
app.get('/', async (req, res) => {
    try {
        CapaReport.find({}, (err,capas) => {
            //Render and FIND list in the database:
            res.render('index.ejs', {
                capaReports: capas
            })
        })  
    } catch (error) {
        if (err) return res.status(500).send(err)        
    }
})

//POST-request method for post-requests:
//Contains object with properties and values that will be passed to the db
app.post('/', async (req,res) => {
    const capaReport = new CapaReport(
        {
            capaNumber: req.body.capaNumber,
            dateCapaCreated: req.body.dateCapaCreated,
            capaStatus: req.body.capaStatus,
            capaPhase: req.body.capaPhase,
            problemStatement: req.body.problemStatement,
            nextPhaseDueDate: req.body.nextPhaseDueDate,
            dateCapaApproved: req.body.dateCapaApproved,
            productImpacted: req.body.productImpacted,
        }
    )
    try {
        await capaReport.save()
        console.log(capaReport)
        res.redirect("/")
    } catch(err){
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})











 //app,listen() to initialize the server
app.listen(process.env.PORT || PORT, () => console.log(`Express server is running on port ${PORT}!`))