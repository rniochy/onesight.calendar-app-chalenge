import mongoose from "mongoose";

const URI = process.env.URI

export default function connect(){
    mongoose.connect(URI,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
    });
    
    const connection = mongoose.connection
    return connection.once('open',()=>{
         console.log("db is connected!")
    })
} 