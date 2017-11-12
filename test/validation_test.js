const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('should validate the name', (done) => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required');
        done();
    });

    it('should validate the length of name to be greater than 2 characters', (done) => {
        const user = new User({ name: 'Ra' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
        done();
    });

    it('dissalows invalid records from being saved', (done) => {
        const user = new User({ name: 'Ra' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters');
                done();
            });
    });
});