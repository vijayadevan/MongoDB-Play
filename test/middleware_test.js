const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {
    let vijay, blogPost;
    beforeEach((done) => {
        vijay = new User({
            name: 'Vijay'
        });
        blogPost = new BlogPost({
            title: 'MongoDB verithanam!',
            content: 'My first Post'
        });

        vijay.blogPosts.push(blogPost);

        Promise.all([vijay.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        vijay.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});