const router = require('express').Router();
//at index- global 'router' variable is used

//This is at /api
router.use('/songs', require('./songRoutes'));
router.use('/artists', require('./artistRoutes'));
router.use('/songs-with-artists', require('./songsWithArtistsRoute'))



module.exports = router;