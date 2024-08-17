import mongoose, {connect} from "mongoose";

const connectToMongo = () => {
 const res = mongoose.connect('mongodb://localhost:27017/loginApp');
if(res){
  console.log("Connected To Database Successfully...");
}
}
export default connectToMongo;