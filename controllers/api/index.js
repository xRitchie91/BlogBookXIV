const router = require('express').Router();

//const homeRoutes = require('./home-routes.js');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

//router.use('/', homeRoutes);
router.use('/api/comments', commentRoutes);
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);

module.exports = router;