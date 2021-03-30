
import Story from '../models/story.js';
const Controller = {
    find:async(req,res) => {
        let story = await Story.findOne({_id: req.params.id}).populate({path: 'author', select:['username', 'email']}).populate({path: 'blog', select: 'name'})
        if (story){
            return res.send(story)
        }else {
            return res.status(400).send({error: 'No story with id: ' + req.params.id})
        }
    },
    findBlogStories: async(req,res) => {
        let stories = await Story.find({blog: req.params.id})
        return res.send({stories})
    },
    findAll:async(req,res) => {
        let stories = await Story.find().limit(10)
        return res.send({stories})
    },
    create:async(req,res) => {
        let body = req.body
        if (!body.title){
            return res.status(400).send({error: "Title is required"});
        }
        if (!req.user.blogs.includes(body.blog)){
            return res.status(401).send({error: "Unauthorized to publish to the requested blog"})
        }
        else{
            let story = new Story(body)
            story.author = req.user._id,
            story.save((err, doc)=> {
                if (err){
                    return res.send(400).status({error: err})
                }
                else {
                    res.send(doc)
                }
            })
           
        }
    },
    update:async(req,res) => {
        let body = req.body
        
        if (req.user.blogs.map(id => id === req.blog).reduce((sum,next)=> sum || next, false)){
            return res.status(401).send({error: "Unauthorized to publish to the requested blog"})
        }
        else{
            let story = await Story.updateOne({_id: req.params.id},body)
            if (story.n === 1 && story.nModified === 1) res.send(story)
            else res.status(400).send({error: 'Error Updating Story'})
        }
    },
    delete:async(req,res) => {
        
    }
}

export default Controller;