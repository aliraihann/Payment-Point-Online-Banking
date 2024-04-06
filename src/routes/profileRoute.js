const {Router} = require('express');
const {profile, update, balance} = require('../controllers/profileController');
const authentication = require('../middleware/authenticationMiddleware');
const router = Router();

router.get('/profile', authentication, profile);
router.put('/profile/update', authentication, update);
router.get('/balance', authentication, balance);

module.exports = router;
