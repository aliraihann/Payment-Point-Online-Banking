const {topUp, transactionHistory, transaction} = require('../controllers/transactionController');
const authentication = require('../middleware/authenticationMiddleware');
const {Router} = require('express');
const router = Router();

router.post('/topup', authentication, topUp);
router.get('/transaction/history', authentication, transactionHistory);
router.post('/transaction', authentication, transaction);


module.exports = router;