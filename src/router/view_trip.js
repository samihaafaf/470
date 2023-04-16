const {Router} = require('express');

const showTripController = require('../controllers/show_tripController');

const router = Router();

router.get('/booked_rides',showTripController.booked_get);      //for showing the booked rides

/*

handles the click set to true + add to add to the booked db
*/ 

router.post('/selected_post',showTripController.selected_post);  
router.post('/trip_detail',showTripController.detail_post);

module.exports = router;