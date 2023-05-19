const mongoose = require('mongoose');


if (process.env.MONGODB_URI) {
    const connectionParams = {
        useNewURLParser: true,
        useUnifiedTopology: true
    }

    try {
        mongoose.connect(process.env.MONGODB_URI, connectionParams);
        console.log(process.env.mongoDBUrl);
        // mongoose.connect(process.env.MONGODB_URI);
        const db = mongoose.connection;

        db.on('error', function (err) {
            connected=false;
            console.log('error connection to mongo server!');
            console.log(err);
        });

        db.once('open', function () {
            console.log('storing records at mongoDB');
        })
    }
    catch(err){
        console.log('#####',err);
    }
    
}
else {
    const connectionParams = {
        useNewURLParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(process.env.mongoDBUrl, connectionParams);
    
    const db = mongoose.connection;

    db.on('error', console.error.bind(console.log('error connecting to db')));

    db.once('open', function () {
        console.log('storing records at mongoDB');
    })
}
