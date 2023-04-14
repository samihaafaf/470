const posted_trip = require("../models/trips");
const booked_trip = require("../models/booked");
const students = require("../models/registers");

/*
this function finds the trips booked by the user and returns info of the those
trips and their posters.
*/
module.exports.booked_get = async (req, res) => {
    const current_user = req.session.userID;    
    //get data from booked table for the user id
    //console.log(current_user);
     const trips = await booked_trip.find({booked_by:current_user}); //rides booked by current user

    const our = [];
    for(let i=0; i<trips.length; i++) {
        let id = trips[i].trip_id;
        let info = await posted_trip.find({_id: id});
        our.push(info[0]);  //this stores the info of the bokked trips
    }
    const target = [];
   
    for(let j=0; j<our.length;j++){
        let stu = our[j].poster;
        let info2 = await students.find({_id:stu});
        
        target.push(info2[0]);

        }
        
    
    console.log("the poster info is:")
    console.log(target);
    console.log("the trips info is:")
    console.log(our);
    
    
    res.render("booked_rides", {trips:our,stu:target}); // this gets the trips selected by the user through the booked table
    
    
}


/* 
the below function sets the selected trip in view page to true when clicked
*/
module.exports.selected_post = async(req, res) => {
    const tripID  = req.body.selected_id;

    await posted_trip.updateOne({_id: tripID }, {    //here the selected field is set to true
        $set: {
          selected: true              
        }
    });
    const bt = new booked_trip({
        booked_by: req.session.userID,   //stores the ID of the person who booked this trip
        trip_id: tripID  //this is the trip id of trip
    
    //change the selected to true for the thing variable in the trip table.
    })
    const book = await bt.save();
    res.status(201).render("index");
    
    res.redirect("/view");
}