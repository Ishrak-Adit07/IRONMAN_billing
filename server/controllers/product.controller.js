import { createDocument, findDocumentByMultipleAttributes } from "../database/appwrite.queries";

const getProduct = async(req, res)=> {
    console.log("Get product");
}

const setProduct = async(req, res)=> {

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

export {getProduct, setProduct}

//dummy