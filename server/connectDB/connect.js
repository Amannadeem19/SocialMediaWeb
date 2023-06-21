import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const connectDB = (url)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    })
}
// mongoose.set('useFindAndModify', false);

export default connectDB;