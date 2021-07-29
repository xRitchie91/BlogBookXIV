const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment')

//create associations

//a user can have many blog posts
User.hasMany(BlogPost, {
    foreignKey: 'user_id'
})

//user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

//a blog post can belong to one user
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

//posts can have many comments
BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

//comments belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

//comments belong to one blog post
Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

module.exports = {User, BlogPost, Comment}