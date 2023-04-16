const {Router} = require('express');

const adminController = require('../controllers/adminController');

const router = Router();

const redirectDash = (req, res, next) => {
    if (req.session.userID){
        res.redirect('/admin_dash');
    } else {
        next();
    }
}

router.get('/adminLogin',redirectDash, adminController.admin_get);
router.post('/adminLogin',redirectDash,adminController.admin_post);
router.get('/manageAccount',adminController.manage_get);
router.post('/manageAccount',adminController.manage_post);


module.exports = router;