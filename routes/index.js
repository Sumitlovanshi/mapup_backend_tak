const router = require('express').Router();
const authRoutes = require('./auth');
const mapRoutes = require('./map');

router.use('/auth', authRoutes);
router.use('/map', mapRoutes);


// starting route
router.get('/', (req, res) => {
    res.send('Welcome : This thing works!!'); 
}); 

module.exports = router; 