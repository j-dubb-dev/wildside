import mongoose from 'mongoose';
import Blog from './blog.js';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['reader', 'author', 'blog-admin', 'admin'],
        required: true,
        default: 'reader'
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    blogs: {
        type:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Blog'
            }
        ],
        required: true,
        default: []
    },
    followers: {
        type:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        required: true,
        default: []
    },
    following: {
        type:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        required: true,
        default: []
    },

    joined: Date,

})
const User = mongoose.model('User', userSchema);
export const authenticate = async (id) => {
 const user = await User.findById(id);
 if (user) {
     user.isAuthenticated = true;
     user.hasRole = authorize(user)
     return user
 }else {
     return {
        isAuthenticate :false,
        hasRole: () => false,
     }
 }
}
const authorize = (user) => (role) =>{

   return roles[role].includes(user.type)
}

const roles = {
    "admin": ["admin"],
    "blog-admin": ["admin","blog-admin"],
    "author":["admin", "blog-admin","author"],
    "reader": ["admin", "blog-admin","author", "reader"],
    undefined: []
}


export default User;

