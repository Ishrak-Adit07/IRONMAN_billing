import { createDocument, deleteDocument, findDocument, findDocumentByMultipleAttributes, updateDocument } from "../database/appwrite.queries";

const getProduct = async(req, res)=> {
    
    const {name, type} = req.params;

    try {

        if(!name || !type){
            res.status(404).send({error: "All fields required"});
        }
    
        else{

            const prodcutAttributes = [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "type",
                    value: type
                },
            ];
    
            const exist = await findDocumentByMultipleAttributes(process.env.APPWRITE_PRODUCT_COLLECTION_ID, prodcutAttributes);
            if(exist.total != 0){
                const product = exist.documents[0];
                res.status(200).send({product});
            }
            else{

                res.status(404).send({message: "Cannot find this product"});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }

}

const getProductsByName = async(req, res)=> {
    
    const {name} = req.params;

    try {

        if(!name){
            res.status(404).send({error: "Product name is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, "name", name);
            if(exist.total != 0){
                const products = exist.documents;
                res.status(200).send({products});
            }
            else{
                res.status(404).send({message: "No such products"});
            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }

}

const getProductsByType = async(req, res)=> {
    
    const {type} = req.params;

    try {

        if(!type){
            res.status(404).send({error: "Product type is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, "type", type);
            if(exist.total != 0){
                const products = exist.documents;
                res.status(200).send({products});
            }
            else{
                res.status(404).send({message: "No such products"});
            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }

}

const addProduct = async(req, res)=> {

    const {name, type, price} = req.body;
    console.log(name, type);

    try {

        if(!name || !type || !price){
            res.status(404).send({error: "All fields required"});
        }
    
        else{

            const prodcutAttributes = [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "type",
                    value: type
                },
            ];
    
            const exist = await findDocumentByMultipleAttributes(process.env.APPWRITE_PRODUCT_COLLECTION_ID, prodcutAttributes);
            if(exist.total != 0){
                res.status(404).send({error: "This product is already present"});
            }
            else{
                
                const productData = {
                    name,
                    type,
                    price,
                }
                const createProductResponse = await createDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, productData);

                res.status(201).send({createProductResponse});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }

}

const deleteProduct = async(req, res)=>{

    const {name, type} = req.body;

    try {

        if(!name || !type){
            res.status(404).send({error: "All fields required"});
        }
    
        else{

            const prodcutAttributes = [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "type",
                    value: type
                },
            ];
    
            const exist = await findDocumentByMultipleAttributes(process.env.APPWRITE_PRODUCT_COLLECTION_ID, prodcutAttributes);
            if(exist.total != 0){
                const deleteProductResponse = await deleteDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, exist.documents[0].$id);
                res.status(201).send({message: "Product " + name + " of type " + type + " is deleted"});
            }
            else{

                res.status(404).send({message: "Cannot find this product"});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }

}

const editPrice = async(req, res) =>{

    const {name, type, newPrice} = req.body;

    try {

        if(!name || !type || !newPrice){
            res.status(404).send({error: "All fields required"});
        }
    
        else{

            const prodcutAttributes = [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "type",
                    value: type
                },
            ];
    
            const exist = await findDocumentByMultipleAttributes(process.env.APPWRITE_PRODUCT_COLLECTION_ID, prodcutAttributes);
            const oldPrice = exist.documents[0].price;
            if(exist.total != 0){

                const updates = {
                    price: newPrice,
                }

                const updatePriceResponse = await updateDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, exist.documents[0].$id, updates);
                res.status(201).send({message: "Price of product " + name + " of type " + type + " is updated from " + oldPrice + " to " + newPrice});
            }
            else{

                res.status(404).send({message: "Cannot find this product"});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({error:e.message});
    }

}

export {getProduct, addProduct, getProductsByName, getProductsByType, deleteProduct, editPrice}