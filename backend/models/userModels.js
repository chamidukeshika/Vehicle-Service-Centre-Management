import mongoose from "mongoose";
import { stringify } from "querystring";

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    });


const User = mongoose.model('User', userSchema);

export default User;


// 48 min resume