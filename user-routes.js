const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  User.findAll({
    attributes: ['id', 'title', 'body', 'user_id'],
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['id', 'title', 'body'],
      },
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

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        as: 'posts',
        attributes: ['id', 'title', 'body']
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'comment_text', 'created_at'],
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

