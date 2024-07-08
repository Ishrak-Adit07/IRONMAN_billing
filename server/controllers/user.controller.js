import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sdk from 'node-appwrite';

import dotenv from 'dotenv';
dotenv.config();

// Initialize Appwrite client
const client = new sdk.Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

console.log("Appwrite database connected");
const databases = new sdk.Databases(client);

const databaseId = '668c09b0001d9a591bbf'; // Your database ID
const collectionId = '668c09c2002a67016572';    // Your collection ID

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET_WEB_KEY, {expiresIn: "10d"});
};

const registerUser = async(req, res)=>{

    const {name, password} = req.body;
    console.log(name);

    try {

        if(!name || !password){
            res.status(404).send({error: "All fields required"});
        }
    
        else{
    
            //const exist = await User.findOne({name});
            const exist = false;
            if(exist){
                res.status(404).send({error: "Name is already in use"});
            }
            else{
                
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                const userData = {
                    name,
                    password: hashedPassword,
                }
                const registerResponse = await databases.createDocument(databaseId, collectionId, 'unique()', userData);

                //const webToken = createToken(user._id);

                res.status(201).send({registerResponse});

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