const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const vijay = new User({
            name: "Vijay",
            posts: [{ title: 'First Post' }]
        });

        vijay.save()
            .then(() => User.findOne({ name: "Vijay" }))
            .then((result) => {
                assert(result.posts[0].title === 'First Post');
                done();
            });
    });

    it('can add subdocuments to an existing record', (done) => {
        const rk = new User({ name: "Radhakrishnan" });
        rk.save()
            .then(() => User.findOne({ name: "Radhakrishnan" }))
            .then((user) => {
                user.posts.push({ title: "Added Post" });
                return user.save();
            })
            .then((users) => {
                assert(users.posts[0].title === "Added Post");
                done();
            });
    });
    it('can remove subdocuments from an existing record', (done) => {
        const rishu = new User({
            name: "Rishu Kumar",
            posts: [{ title: "To be deleted" }]
        });
        rishu.save()
            .then(() => User.findOne({ name: "Rishu Kumar" }))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: "Rishu Kumar" }))
            .then((users) => {
                assert(users.posts.length === 0);
                done();
            });
    });
});