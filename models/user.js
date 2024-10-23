import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String,
        select: false  //don't send it with all data, only send when select("password")
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now
    }

})

export const User = mongoose.model('Users', schema)