

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn"); 


const Student = require("./models/registers");
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

app.get("/login", (req, res) => {
    res.render("login");
}) 

//create a new user in the database
app.post("/register_form",async (req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirm_password;

        if (password==cpassword){
            
            const studentRegister = new Student({   //show a prompt that the email or password is
                                                    // not unique
                first_name: req.body.first_name,
                last_name: req.body.first_name,
                department: req.body.last_name,
                email: req.body.email,
                password: password ,
                confirm_password: cpassword,
                phone_no:req.body.phone_no
            })
            const registered = await studentRegister.save();
            res.status(201).render("index");


            }else{
                
                res.send("password not matching")
            }
        //const registered = await Student.save();
               //res.status(201).render(index);
        
         } catch(error){
        res.status(400).send(error);
    }
}) 


//app.get - for getting data
//app.put - for edit data
//app.post - for adding data
//app.delete - for deleting data


//create a new user in out db
app.get("/register_form", (req, res) => {
    res.render("register_form");
}) 



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

