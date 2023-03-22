const router = require('express').Router();
const mapController = require('./controller/mapController');
const {authenticate} = require('../auth/middleware/authenticate');

router.post('/findIntersection',authenticate,mapController.findIntersection);


module.exports = router;