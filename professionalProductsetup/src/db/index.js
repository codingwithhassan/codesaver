import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

async function connection() {

try{
await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
console.log('Database is connected TO ${DB_NAME}');







}catch(err){
console.log(err);
}
}

export default connection