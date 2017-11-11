const assert = require('assert');
const User = require('../src/user');

describe('Deleting a User', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: "Joel"
        });
        joe.save()
        .then(() => done());
    });

    it('should delete instance user', (done) => {
        joe.remove()
            .then(() => User.findOne({name: "Joel"}))
            .then((res) => {
                assert(res === null);
                done();
            });
    });
});

