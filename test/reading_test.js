const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let joe, vijay, rk, rishu;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        vijay = new User({ name: 'Vijay' });
        rk = new User({ name: 'Radha' });
        rishu = new User({ name: 'Rishu' });

        Promise.all([joe.save(), vijay.save(), rk.save(), rishu.save()])
            .then(() => done());
    });

    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0].name === 'Joe');
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({name: 1})
            .skip(1)
            .limit(2)
            .then((res) => {
                assert(res.length === 2);
                assert(res[0].name === 'Radha');
                assert(res[1].name === 'Rishu');
                done();
            });
    });
});
