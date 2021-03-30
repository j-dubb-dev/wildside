
import {authenticate as auth} from '../models/user.js';

const authenticate = async (req, res, next) => {
    const user = await auth(req.session.user);
   
    req.user = user
    console.log(user)
    next();
}

export const adminRole = (req, res, next) => {
    req.role = 'admin';
    next();
}
export const blogAdminRole =  (req, res, next) => {
    req.role = 'blog-admin';
    next();
}
export const authorRole =  (req, res, next) => {
    req.role = 'author';
    next();
}
export const readerRole =  (req, res, next) => {
    req.role = 'reader';
    next();
}


export const authorize =  (req, res, next) => {
    if (req.user && req.role){
        const user = req.user
        const role = req.role
    
        if (user.hasRole(role)){
            next()
        }
        else {
            res.status(401).send({error: "Not Authorized For Requested Content"})
        }
    }else {
        res.status(401).send({error: "Not Authorized For Requested Content"})
    }
}

export default authenticate;