const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll({
      attributes: ['id', 'comment_text', 'user_id', 'post_id'],
      include: [
        {
            model: User,
            as: 'user',
            attributes: ['username'],
          },
      ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: [
          {
              model: User,
              as: 'user',
              attributes: ['username'],
            },
        ],
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }  
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

