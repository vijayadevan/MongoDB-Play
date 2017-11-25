const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    const uri = "mongodb://vijayadevan:LrGSdYiCvSlSNVnM@mongoplay-shard-00-00-nuszv.mongodb.net:27017,mongoplay-shard-00-01-nuszv.mongodb.net:27017,mongoplay-shard-00-02-nuszv.mongodb.net:27017/TodoApp?ssl=true&replicaSet=MongoPlay-shard-0&authSource=admin"

    mongoose.connect(uri, {
        useMongoClient: true
    });

    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users, blogposts, comments } = mongoose.connection.collections;

    users.drop(() => {
        blogposts.drop(() => {
            comments.drop(() => {
                // Ready to run the next test!
                done();
            });
        });
    });
});
