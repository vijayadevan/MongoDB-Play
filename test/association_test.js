const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', () => {
    let vijay, blogPost, comment;
    beforeEach((done) => {
        vijay = new User({
            name: 'Vijay'
        });
        rishu = new User({
            name: 'Rishu'
        });
        blogPost = new BlogPost({
            title: 'MongoDB verithanam!',
            content: 'My first Post'
        });
        comment = new Comment({
            content: 'Congrats on ur first Post!'
        });

        vijay.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = rishu;

        Promise.all([vijay.save(), rishu.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation bw a user and a blogpost', (done) => {
        User.findOne({ name: 'Vijay' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'MongoDB verithanam!');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Vijay' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Vijay');
                assert(user.blogPosts[0].title === 'MongoDB verithanam!');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on ur first Post!');
                assert(user.blogPosts[0].comments[0].user.name === 'Rishu');
                done();
            });
    });
});