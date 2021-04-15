const router = require('express').Router();
// import API routes from API directory
const apiRoutes = require('./api');

// add API prefix
router.use('/api', apiRoutes)

module.exports = router;