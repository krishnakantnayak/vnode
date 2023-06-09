const mongoose=require('mongoose');



const connectionParams={
            useNewURLParser:true,
            useUnifiedTopology:true
        }


mongoose.connect(process.env.mongoDBUrl,connectionParams);

// mongoose.connect(process.env.MONGODB_URI);
const db=mongoose.connection;

db.on('error',console.error.bind(console.log('error connecting to db')));

db.once('open',function(){
    console.log('storing records at mongoDB');
})