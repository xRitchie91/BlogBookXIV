const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// get users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
          model: Comments,
          as: 'comments',
          attributes: ['id', 'comment_text', 'user_id'],
        },
    ],
})
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
