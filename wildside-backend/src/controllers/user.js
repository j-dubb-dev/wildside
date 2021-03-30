import User, {authenticate} from '../models/user.js';
import bcrypt from 'bcrypt';
const print =  (str) => {console.log(str)}
const Controller = {
    find:  (req,res) => {

    },
    findAll: async (req,res) => {
        
        if (req.user?.isAuthenticated) {
            console.log('authenticated')
            console.log(req.user.username)
         
        }
        await User.find({}, (err, docs)=> {
            
            const users = docs.map(doc=> {
             
                doc.password = undefined;
                return doc
            })
            res.json(users)
        });
    },
    create: async (req,res) => {
        let body = req.body;
        if (!(body.email && body.password)){
            return res.status(400).send({error: "Missing Email or Password"});
        }
        const user = new User(body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.joined = new Date();
        user.save((err, doc)=> {
            if (err) {
                console.log(err);
                if(err.code === 11000){
                    return res.status(400).send({error: "Email or Username Already Exists"});
                    
                }
                return res.status(400).send({error: "User Data Not Formatted Properly"});
             
            }else {
                doc.password = undefined;
                return res.status(200).send(doc);
            }
        })
    }, 
    update: async (req,res) => {
        let body = req.body;
        let user = req.user
        if (!(req.params.id === user._id || user.hasRole('admin'))){
            return res.status(401).send({error: "cannot update another user"})
        }
        else if (user && body){
           
            await user.save();
            return res.status(200).send('Password Updated')
        }else {
            return res.status(400).send({error: "User Not Found"})
        }
    },
    passwordUpdate: async (req,res) => {
        let body = req.body;
        let query = {}
        if (!(body.email || body.username ||(body.password && body.password.new && body.password.old))){
            return res.status(400).send({error: "Missing Username, Email, or Password"});
        }
        if (body.email){
            query.email = body.email
        }else {
            query.username = body.username
        }
        const user = await User.findOne(query);
        if (user){
            const validPassword = await bcrypt.compare(body.password.old, user.password);
            if (!validPassword){
                return res.status(401).send({error: "Incorrect Password"});
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(body.password.new, salt);
            await user.save();
            return res.status(200).send('Password Updated')
        }else {
            return res.status(400).send({error: "User Not Found"})
        }
    },
    delete: (req,res) => {
        
    },
    signin: async (req,res) => {
        print('sign in')
        print(req.body)
        const body = req.body;
        let query = {}
        if (!(body.email || body.username)){
            return res.status(400).send({error: "Missing Email or Password"});
        }
        if (body.email){
            query.email = body.email
        }else {
            query.username = body.username
        }
        const user = await User.findOne(query);
        if (user){
            const validPassword = await bcrypt.compare(body.password, user.password);
            if (validPassword) {
                req.session.views = (req.session.views || 0) + 1
                req.session.user = user._id
                user.password = undefined
                return res.status(200).send(user);
                print(`Users logged in ${req.session.views} times during the session`)
              } else {
                return res.status(400).send({ error: "Invalid Password" });
              }
        }
        else {
            res.status(401).send({ error: "User does not exist" });
        }      
    },
    signout: async (req,res) => {
        req.session = null;
        res.status(200).send('Session Ended')     
    }
}

export default Controller;