

import Blog from '../models/blog.js';
import User from '../models/user.js';
import Story from '../models/story.js';
const Controller = {
    find: async (req,res) => {
        const name = new RegExp('^' + req.params.name + '$', 'i');
        
        const blog = await Blog.findOne({name: { $regex: name}})
        res.send(blog)
    },
    findAll: async(req,res) => {
        const blogs = await Blog.find({}).populate({path: 'admins', select: 'username'})
        res.send(blogs)
    },
    findAllStories: async (req,res) => {
        const stories = await Story.find({blog: req.params.id})
        
        return res.send(stories)
    },
    create: async (req,res) => {
        let body = req.body;
        if (!body.name){
            res.status(400).send({error: "Blog Name Is Required"})
        }
        let blog = new Blog(req.body);
        req.user.blogs.push(blog._id)
        
        blog.save((err, blog)=> {
            if (err){
                return res.status(400).send({error: 'Unable to create blog'})
            }
            req.user.save((err, user)=> {
                if (!err){
                    user.password = undefined
                    return res.send({blog, user})
                }else {
                    return res.status(400).send({error: 'Unable to add blog to user', detailedError: err})
                }
            })
            
            
        })
    },
    update: (req,res) => {
        
    },
    delete: async(req,res) => {
        const blog = await Blog.deleteOne({name: req.params.id})
        const users = await User.updateMany({}, {"$pull": { blogs: req.params.id}}, {multi: true} )
    
        res.status(200).send({message: "deleted"})
    }
}

export default Controller;