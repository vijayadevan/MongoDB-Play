const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
    it('should check the Virtual types', (done) => {
        const Vijay = new User({
            name: "Vijay",
            posts: [{ title: "first post" }, { title: "second post" }]
        });

        Vijay.save()
            .then(() => User.findOne({ name: "Vijay" }))
            .then((result) => {
                assert(result.postCount === 2);
                done();
            });
    });
});