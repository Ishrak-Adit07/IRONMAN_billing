import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
import { createDocument, deleteDocument, findDocument } from '../database/appwrite.queries';
dotenv.config();

const encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

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
    
            const exist = await findDocument(process.env.APPWRITE_USER_COLLECTION_ID, "name", name);
            if(exist.total != 0){
                res.status(404).send({error: "Name is already in use"});
            }
            else{
                
                const hashedPassword = await encryptPassword(password);
                const userData = {
                    name,
                    password: hashedPassword,
                }
                const registerResponse = await createDocument(process.env.APPWRITE_USER_COLLECTION_ID, userData);

                const webToken = createToken(registerResponse.$id);

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
        
        const user = await findDocument(process.env.APPWRITE_USER_COLLECTION_ID, "name", name);
        if(user.total === 0){
            res.status(404).send({error: "No such user found"});
        }
        else{
            const match = await bcrypt.compare(password, user.documents[0].password);
            if(!match){
                res.status(404).send({error: "Invalid Credentials"});
            }
            else{
                const webToken = createToken(user.documents[0].$id);
                res.status(201).send({name, webToken});
            }
        }

    } catch (e) {
        console.log(e);
        res.status(404).send({error:e.message});
    }

}

const deleteUser = async(req, res)=>{

    const {name} = req.body;

    if(!name){
        res.status(404).send({error: "Name is required"});
    }

    try {
        
        const user = await findDocument(process.env.APPWRITE_USER_COLLECTION_ID, "name", name);
        if(user.total === 0){
            res.status(404).send({error: "No such user found"});
        }
        else{
            const deleteUserResponse = await deleteDocument(process.env.APPWRITE_USER_COLLECTION_ID, user.documents[0].$id);
            res.status(201).send({message: "User " + name + " is deleted"});
        }

    } catch (e) {
        console.log(e);
        res.status(404).send({error:e.message});
    }

}


export { registerUser, loginUser, deleteUser }