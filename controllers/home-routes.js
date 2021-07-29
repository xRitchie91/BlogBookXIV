
const router = require('express').Router();
const sequelize = require('../config/connection');
const {BlogPost, User, Comment} = require('../models')


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

    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }))
        res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username })
    })
    .catch(err => res.status(500).json(err))
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return
    }
    res.render('login')
});

router.get('/post/:id', (req, res) => {
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
        res.status(404).json({message: 'Post not found!'});
        return
    }  

const post = postData.get({plain: true})
res.render('single-blogpost', { post, loggedIn: req.session.loggedIn, username: req.session.username })
})
.catch(err => res.status(500).json(err))
});

module.exports = router;
