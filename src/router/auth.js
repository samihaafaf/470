
const {Router} = require('express');

const authController = require('../controllers/authController');

const router = Router();


router.get('/register_form', authController.register_get);
router.post('/register_form',authController.register_post); //auth controller e register_poat namer function create korbo
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);
/*
app.get("/login", (req, res) => {
    res.render("login");
})
*/


module.exports = router;