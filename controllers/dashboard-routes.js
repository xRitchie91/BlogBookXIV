
// dependencies for dashboard routes
const router = require('express').Router();
const sequelize = require('../config/connection');
const {BlogPost, User, Comment} = require('../models');
const authenticateUser = require('../utils/auth')

// retrieve dashboard contents
router.get('/', authenticateUser, (req, res) => {
    BlogPost.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id','title','post_text','created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id','comment_text','post_id','user_id', 'created_at'],
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
    }).then(postData => {
        const posts = postData.map(post => post.get({plain: true}));
        
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username})
    }).catch(err => res.status(500).json(err))
})

// retrieve dashboard edit
router.get('/edit/:id', authenticateUser, (req, res) => {
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
    }).then(postData => {
        if(postData){
        const post = postData.get({plain: true})
        res.render('edit-blogpost', { post, loggedIn: true, username: req.session.username})
        } else {
            res.status(404).end();
        }
    }).catch(err => res.status(500).json(err))
})
module.exports = router;