const express = require('express')
const { ensureAuth, ensureGuest } = require('./middleware/auth')
const app = express()
const PORT = 8500;
const mongoose = require('mongoose');
//Use env to add protection to the Mongo connection string: 
require('dotenv').config({path: './config/.env'})
//add model variable "CapaReports" that was declared in capareport.js
const CapaReport = require('./models/capareport.js')
const connectDB = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
// const MongoClient = require('mongodb').MongoClient

require('./config/passport')(passport)
connectDB()
//Declare middlewares (move traffic to and from front-end to endpoints)
app.set("view engine","ejs") //using ejs for our view engine. Located in views directory
app.use(express.static('public')) //Express will refer to the public folder. Stylesheet goes in public.
app.use(express.urlencoded({extended: true})) //helps validate info we are moving back-forth. Extended allows us to pass complex data such as arrays and objects

//tell mongoose to pull data from the env file
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log("Connected to Mongo Database!")}
 )

// Session Middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.DB_CONNECTION,}),
    })
  )

//Make sure this is AFTER the app.use(session) Middleware:
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', require('./routes/auth'))


//GET-request method to render the page (route '/capa'):
app.get('/capa', ensureAuth, async (req, res) => {
    try {
        CapaReport.find({}, (err,capas) => {
            //Render and FIND list in the database:
            //pass the user display name and also the capas database for the render:
            res.render('index.ejs', {
                name: req.user.displayName,
                capaReports: capas,
            })
        })  
    } catch (err) {
        if (err) return res.status(500).send(err)        
    }
})


//GET-request for rendering the login page at route '/'. Does not need async since we are not fetching from a server. Pass "ensureGuest", meaning user does not need to be logged-in to access login page.
app.get('/', ensureGuest, (request,response) => {
    response.render('login.ejs')
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
            currentPhaseDueDate: req.body.currentPhaseDueDate,
            dateCapaApproved: req.body.dateCapaApproved,
            productImpacted: req.body.productImpacted,
        }
    )
    try {
        await capaReport.save()
        console.log(capaReport)
        res.redirect('/capa')
    } catch(err){
        if (err) return res.status(500).send(err)
        res.redirect('/capa')
    }
})

//UPDATE Request for capa editing - pass "ensureAuth" so only logged-in users can access these routes.
app //chain multiple methods together (route, get, post, etc.)
    .get("/edit/:id", ensureAuth, (req, res) => {
        const id = req.params.id;
        CapaReport.find({}, (err, capas) => {
            res.render("edit.ejs", { 
                name: req.user.displayName,
                capaReports: capas, idCapa: id });
        });
    })
    .post("/edit/:id", ensureAuth,(req, res) => {
        const id = req.params.id;
        CapaReport.findByIdAndUpdate(//mongoose method for Updating
            id,
            {
                capaNumber: req.body.capaNumber,
                dateCapaCreated: req.body.dateCapaCreated,
                capaStatus: req.body.capaStatus,
                capaPhase: req.body.capaPhase,
                problemStatement: req.body.problemStatement,
            },

            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/capa");
            });
    });

//UPDATE Request for capa date editing - pass "ensureAuth" so only logged-in users can access these routes.
app //chain multiple methods together (route, get, post, etc.)
    .get("/editdates/:id", ensureAuth, (req, res) => {
        const id = req.params.id;
        CapaReport.find({}, (err, capas) => {
            res.render("editdates.ejs", { 
                name: req.user.displayName,
                capaReports: capas, idCapa: id });
        });
    })
    .post("/editdates/:id", ensureAuth, (req, res) => {
        const id = req.params.id;
        CapaReport.findByIdAndUpdate(//mongoose method for Updating
            id,
            {
                currentPhaseDueDate: req.body.currentPhaseDueDate,
                dateCapaApproved: req.body.dateCapaApproved,
            },
            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/capa");
            });
    });


//Delete-request for capa removal:
app 
    .route("/remove/:id")
    .get((req,res) => {
        const id = req.params.id
        CapaReport.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/capa')
        })
    })

 //app,listen() to initialize the server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Express server is running on port ${PORT}!`)
})