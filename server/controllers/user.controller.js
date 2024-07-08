import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';

import dotenv from 'dotenv';
dotenv.config();


const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET_WEB_KEY, {expiresIn: "10d"});
};

const registerUser = async(req, res)=>{

    const {name, password} = req.body;

    try {

        if(!name || !password){
            res.status(404).send({error: "All fields required"});
        }
    
        else{
    
            const exist = await User.findOne({name});
            if(exist){
                res.status(404).send({error: "Name is already in use"});
            }
            else{
                
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                const user = await User.create({name, password:hashedPassword});

                const webToken = createToken(user._id);
                
                res.status(201).send({name, webToken});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }
}

const loginUser = async(req, res)=>{

    const {name, password} = req.body;

    if(!name || !password){
        res.status(404).send({error: "All fields are required"});
    }

    try {
        
        const user = await User.findOne({name});
        if(!user){
            res.status(404).send({error: "No such user found"});
        }
        else{
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                res.status(404).send({error: "Invalid Credentials"});
            }
            else{
                const webToken = createToken(user._id);
                res.status(201).send({name, webToken});
            }
        }

    } catch (e) {
        console.log(e);
        res.status(404).send({error:e.message});
    }

}

export { registerUser, loginUser }