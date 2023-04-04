

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn"); 

const authRoutes = require("./router/auth");  //require the router


const Trip = require("./models/trips");

const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
//const new_path = path.join(__dirname,"../templates/views")

app.use(express.json());
//app.use(express.json());
app.use(express.urlencoded({extended:false}));

//console.log(path.join(__dirname));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);

hbs.registerPartials(partials_path);

app.get("/",(req,res) => {
    res.render("index")
});

//create a new user in the database


//creating the trip database


app.post("/post_ride",async (req, res) => {
    try{
            
        const trips = new Trip({   //show a prompt that the email or password is
                                               // not unique
            trip_t: req.body.trip_t,
            loc: req.body.loc,
            p_class: req.body.p_class,
            dir: req.body.dir,
            gender:req.body.gender,
            date:req.body.date,
            dep:req.body.dep
        })
        const posted = await trips.save();
        res.status(201).render("index");


            
            
        //const registered = await Student.save();
               //res.status(201).render(index);
        
         } catch(error){
        res.status(400).send(error);
    }
}) 

//printing the values from the student database

app.get("/view", async (req,res)=>{
    try{
        const things = await Trip.find({});  //use schema name
        res.render("view", {
            things
        });
        console.log(things);
    }catch(error){
        res.status(400).send(error);
    }
})



app.use(authRoutes);






//app.get - for getting data
//app.put - for edit data
//app.post - for adding data
//app.delete - for deleting data


//create a new user in out db




app.get("/user_dash", (req, res) => {
    res.render("user_dash");
}) 

app.get("/complain", (req, res) => {
    res.render("complain");
})

app.get("/post_ride", (req, res) => {
    res.render("post_ride");
})



app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})

