const express = require('express');
const router = express.Router();
const keyValueStoreController = require('../controllers/keyValueStoreController');

router.get('/', keyValueStoreController.noKey); //route for handling get requests
router.get('/:key', keyValueStoreController.getKeyValue); //route for handling get requests
router.post('/',keyValueStoreController.postKeyValue); // route for handling post requests

module.exports = router;