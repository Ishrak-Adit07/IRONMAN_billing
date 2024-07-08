import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET_WEB_KEY, {expiresIn: "10d"});
};

const registerUser = async(req, res)=>{

    const {email, password} = req.body;
    console.log(email);

    try {

        if(!email || !password){
            res.status(404).send({error: "All fields required"});
        }
    
        else{
    
            const exist = await User.findOne({email});
            if(exist){
                res.status(404).send({error: "Email is already in use"});
            }
            else{
                
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);
                const user = await User.create({email, password:hashedPassword});

                const webToken = createToken(user._id);
                
                res.status(201).send({email, webToken});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }
}

const loginUser = async(req, res)=>{

    const {email, password} = req.body;

    if(!email || !password){
        res.status(404).send({error: "All fields are required"});
    }

    try {
        
        const user = await User.findOne({email});
        if(!user){
            res.status(404).send({error: "No such email found"});
        }
        else{
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                res.status(404).send({error: "Invalid Credentials"});
            }
            else{
                const webToken = createToken(user._id);
                res.status(201).send({email, webToken});
            }
        }

    } catch (e) {
        console.log(e);
        res.status(404).send({error:e.message});
    }

}

export { registerUser, loginUser }