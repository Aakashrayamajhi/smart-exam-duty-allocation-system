import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/data')

const adminschema = mongoose.Schema({
    username: String,
    password: String,
})

const loginmodel = mongoose.model("adminauth", adminschema)

export default loginmodel