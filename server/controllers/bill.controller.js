import { createDocument, findDocument, findDocumentByMultipleAttributes, getAllDocuments } from "../database/appwrite.queries";
import { getProductIDs } from "./product.controller";

const getBills = async(req, res)=> {
    
    try {

        const billResponse = await getAllDocuments(process.env.APPWRITE_BILL_COLLECTION_ID);
        if(billResponse.response.total != 0){
            const bills = billResponse.response.documents;
            res.status(200).send({success:true, bills});
        }
        else{
            res.status(404).send({success:false, message: "No bills found"});
        }
                
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const getBillByID = async(req, res)=> {
    
    const {id} = req.params;

    try {

        if(!id){
            res.status(404).send({success:false, error: "Bill id is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_BILL_COLLECTION_ID, "id", id);
            if(exist.response.total != 0){
                const bill = exist.response.document[0];
                res.status(200).send({success:true, bill});
            }
            else{
                res.status(404).send({success:false, message: "No such bill"});
            }
    
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const getBillsByEmployee = async(req, res)=> {
    console.log("Get Bill");
}

const getBillsByClient = async(req, res)=> {
    console.log("Get Bill");
}

const getBillsByDate = async(req, res)=> {
    console.log("Get Bill");
}

const getBillsByDateRange = async(req, res)=> {
    console.log("Get Bill");
}

const createBill = async (req, res) => {
    const { employee, client, products, quantities } = req.body;

    try {

        if (!employee || !client || products.length === 0 || quantities.length === 0) {
            res.status(400).send({ success: false, error: "All fields required" });
            return;
        }

        const billProducts = await getProductIDs(products);

        const billDetails = {
            employee,
            client,
            products: billProducts,
            quantities,
        };

        const createBillResponse = await createDocument(process.env.APPWRITE_BILL_COLLECTION_ID, billDetails);
        if (createBillResponse.success) {
            const bill = createBillResponse.response;
            res.status(201).send({ success: true, bill });
        } 
        else {
            res.status(500).send({ success: false, error: "Could not make bill, please try again" });
        }

    } catch (e) {
        res.status(400).send({ success: false, error: e.message });
    }
};


const deleteBill = async(req, res)=> {
    console.log("Delete Bill");
}



export { getBills, getBillByID, getBillsByClient, getBillsByEmployee, getBillsByDate, getBillsByDateRange, createBill, deleteBill }

//dummy