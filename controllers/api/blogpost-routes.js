const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models')
const authenticateUser = require('../../utils/auth')

// get all existing posts
// update to include user information on the blog posts
// update to include existing comment data on the blog posts
router.get('/', (req, res) => {
    BlogPost.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id','user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
        })
        .then(postData => res.json(postData))
        .catch(err => res.status(500).json(err))
});

// get a single post
router.get('/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text', 'post_id','user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        if(!postData){
            res.status(404).json({message: 'ERROR: Post Not Found!'});
            return
        }
        res.json(postData)
    })
    .catch(err => res.status(500).json(err))
});

// create one new post
router.post('/', authenticateUser, (req, res) => {
    BlogPost.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    }).then(postData => res.json(postData))
    .catch(err => res.status(500).json(err))
});

// update one post title
router.put('/:id', authenticateUser, (req, res) => {
    BlogPost.update(
        { title: req.body.title }, {
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData){
            res.status(404).json({message: 'ERROR: Post Not Found!'})
            return
        }
        res.json(postData)
    }).catch(err => res.status(500).json(err))
});

// delete one post
router.delete('/:id', (req, res) => {
    BlogPost.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData){
            res.status(404).json({message: 'ERROR: Post Not Found.'})
            return
        }
        res.json(postData)
    }).catch(err => res.status(500).json(err))
});

module.exports = router;