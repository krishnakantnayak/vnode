const mongoose=require('mongoose');



const connectionParams={
            useNewURLParser:true,
            useUnifiedTopology:true
        }

// mongoose.connect('mongodb+srv://d52306406:PQGvxU5GTYGt2xQZ@cluster0.foe8kyf.mongodb.net/',connectionParams);
mongoose.connect(process.env.MONGODB_URI);
const db=mongoose.connection;

db.on('error',console.error.bind(console.log('error connecting to db')));
db.once('open',function(){
    console.log('storing records at mongoDB');
})