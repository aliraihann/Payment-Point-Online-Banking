const getAllServices = require('../controllers/serviceController');
const authentication = require('../middleware/authenticationMiddleware');
const {Router} = require('express');
const router = Router();

router.get('/service', authentication, getAllServices);

module.exports = router;