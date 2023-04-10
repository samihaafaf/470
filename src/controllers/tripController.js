const posted_trip = require("../models/trips");
const booked_trip = require("../models/booked");

//view rides
//view posted rides
module.exports.trip_get = async (req, res) => {
    const current_user = req.session.userID;
    const user  = await posted_trip.find({poster:current_user});   //search using:match using
    
    res.render("posted",{user:user});  //file name, sending data to a hbs file
}

/*
once the ride is selected, the the trip is 
1. added to the booked trip database
2. the booked trip db has the field "booked by" which will have the id of the user who booked the trip
3. once the ride is booked turn the selected into "true".

*/
module.exports.sel_ride = async (req, res) => {
    const thing = req.body.selected_id;
    res.render("select", {thing:thing});
    const bt = new booked_trip({
        booked_by: req.session.userID


    })
    const book = await bt.save();
    res.status(201).render("index");

}



module.exports.view_get = async (req, res) => {
    
    try{

        //db.inventory.find( { price: { $not: { $gt: 1.99 } } } )
        const current_user = req.session.userID;
        //impliment manuakky
        /*
        
        //const all_trip = await posted_trip.find({poster:{$not:{current_user}}});  
        //view rides posted by other riders only
        view rides that are selected false only
        
        */
        
        const all_trip = await posted_trip.find({});
        
        const comp = [];
        /*
        for (let i=0; i<length(all_trip); i++) {
            if (all_trip[i].poster != current_user) {
                comp.push(all_trip[i]);
            }
        }
        console.log("hello");

        console.log(comp);
        */
        console.log("hello");

        res.render("view",{all_trip: all_trip});


    }catch(error){
        res.status(400).send(error);
    }
    
    
    
    //const current_user = req.session.userID;
    //const user  = await posted_trip.find({poster:current_user});   //search using:match using
    
    //res.render("posted",{user:user});  //file name
}

