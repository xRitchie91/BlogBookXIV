const router = require('express').Router();

//const homeRoutes = require('./home-routes.js');
const commentRte = require('./comment-routes');
const userRte = require('./user-routes');
const postRte = require('./post-routes');

//router.use('/', homeRoutes);
router.use('/api/comment-routes', commentRte);
router.use('/api/user-routes', userRte);
router.use('/api/post-routes', postRte);

module.exports = router;