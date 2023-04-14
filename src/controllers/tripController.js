const posted_trip = require("../models/trips");
const booked_trip = require("../models/booked");


/*
the below function prints the posted ride by the current user
*/ 
module.exports.trip_get = async (req, res) => {
    const current_user = req.session.userID;
    const user  = await posted_trip.find({poster:current_user});   //search using:match using
    
    res.render("posted",{user:user});  //file name, sending data to a hbs file
}

//below function stores trips in the booked database
module.exports.sel_ride = async (req, res) => {
    const thing = req.body.selected_id;
    const bt = new booked_trip({
        booked_by: req.session.userID,   //stores the ID of the person who booked this trip
        trip_id: thing  //this is the trip id of trip
    
    //change the selected to true for the thing variable in the trip table.
    })
    const change  = await posted_trip.findOne({_id: thing});
    console.log(change);
    console.log(change.selected);
    //change.selected = true;

    const book = await bt.save();
    res.status(201).render("index");

}


/*
the below function prints the trips other users in the view page.
*/ 
module.exports.view_get = async (req, res) => {
    
    try{

        //db.inventory.find( { price: { $not: { $gt: 1.99 } } } )
        const current_user = req.session.userID;
        
        const all_trip = await posted_trip.find({poster: {$ne: current_user}});

        res.render("view",{all_trip: all_trip});


    }catch(error){
        res.status(400).send(error);
    }
    
    
    
    //const current_user = req.session.userID;
    //const user  = await posted_trip.find({poster:current_user});   //search using:match using
    
    //res.render("posted",{user:user});  //file name
}

