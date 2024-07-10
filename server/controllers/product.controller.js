import { createDocument, deleteDocument, findDocument, findDocumentByMultipleAttributes, updateSingleDocument } from "../database/appwrite.queries";

const getProduct = async(req, res)=> {
    
    const {name, type} = req.params;

    try {

        if(!name || !type){
            res.status(404).send({success:false, error: "All fields required"});
        }
    
        else{

            const productAttributes = [
                {
                    name: "name",
                    value: name
                },
                {
                    name: "type",
                    value: type
                },
            ];
    
            const exist = await findDocumentByMultipleAttributes(process.env.APPWRITE_PRODUCT_COLLECTION_ID, productAttributes);
            if(exist.response.total != 0){
                const product = exist.response.documents[0];
                res.status(200).send({success:true, product});
            }
            else{

                res.status(404).send({success:false, message: "Cannot find this product"});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const getProductIDs = async(products) =>{

    try {

        let billProducts = [];
        for (const product of products) {

            const productAttributes = [
                { name: "name", value: product.name },
                { name: "type", value: product.type },
            ];

            const exist = await findDocumentByMultipleAttributes(process.env.APPWRITE_PRODUCT_COLLECTION_ID, productAttributes);
            if (exist.response.total != 0) {
                const existProduct = exist.response.documents[0];
                billProducts.push(existProduct.$id);
            } 
            else {
                res.status(404).send({ success: false, error: `Product ${product.name} of type ${product.type} is not found` });
                return;
            }
        }

        return billProducts;

    } catch (error) {
        res.status(400).send({success:false, error:e.message});
    }

}

const getProductPricesByIDs = async(productIDs) =>{

    try {

        let productPrices = [];
        for (const productID of productIDs) {

            const exist = await findDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, "$id", productID);
            if (exist.response.total != 0) {
                const existProduct = exist.response.documents[0];
                productPrices.push(existProduct.price);
            } 
            else {
                res.status(404).send({ success: false, error: `Product with id ${productID} is not found` });
                return;
            }
        }

        return productPrices;
        
    } catch (error) {
        res.status(400).send({success:false, error:e.message});
    }

}

const getProductsByName = async(req, res)=> {
    
    const {name} = req.params;

    try {

        if(!name){
            res.status(404).send({success:false, error: "Product name is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, "name", name);
            if(exist.response.total != 0){
                const products = exist.response.documents;
                res.status(200).send({success:true, products});
            }
            else{
                res.status(404).send({success:false, message: "No such products"});
            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const getProductsByType = async(req, res)=> {
    
    const {type} = req.params;

    try {

        if(!type){
            res.status(404).send({success:false, error: "Product type is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, "type", type);
            if(exist.response.total != 0){
                const products = exist.response.documents;
                res.status(200).send({success:true, products});
            }
            else{
                res.status(404).send({success:false, message: "No such products"});
            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const addProduct = async(req, res)=> {

    const {name, type, price} = req.body;
    console.log(name, type);

    try {

        if(!name || !type || !price){
            res.status(404).send({success:false, error: "All fields required"});
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
            if(exist.response.total != 0){
                res.status(404).send({success:false, error: "This product is already present"});
            }
            else{
                
                const productData = {
                    name,
                    type,
                    price,
                }
                const createProductResponse = await createDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, productData);
                res.status(201).send({success:true, createProductResponse});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const deleteProduct = async(req, res)=>{

    const {name, type} = req.body;

    try {

        if(!name || !type){
            res.status(404).send({success:false, error: "All fields required"});
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
            if(exist.response.total != 0){
                const deleteProductResponse = await deleteDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, exist.response.documents[0].$id);
                res.status(201).send({success:true, message: "Product " + name + " of type " + type + " is deleted"});
            }
            else{

                res.status(404).send({success:false, message: "Cannot find this product"});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const editPrice = async(req, res) =>{

    const {name, type, newPrice} = req.body;

    try {

        if(!name || !type || !newPrice){
            res.status(404).send({success:false, error: "All fields required"});
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
            
            if(exist.response.total != 0){

                const oldPrice = exist.response.documents[0].price;

                const updates = {
                    price: newPrice,
                }

                const updatePriceResponse = await updateSingleDocument(process.env.APPWRITE_PRODUCT_COLLECTION_ID, exist.response.documents[0].$id, updates);
                res.status(201).send({success:true, message: "Price of product " + name + " of type " + type + " is updated from " + oldPrice + " to " + newPrice});
            }
            else{

                res.status(404).send({success:false, message: "Cannot find this product"});

            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

export { getProduct, getProductIDs, getProductPricesByIDs, addProduct, getProductsByName, getProductsByType, deleteProduct, editPrice }