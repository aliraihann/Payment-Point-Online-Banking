const showAllBanners = require('../controllers/bannerController');
const {Router} = require('express');
const router = Router();

router.get('/banner', showAllBanners);

module.exports = router;
