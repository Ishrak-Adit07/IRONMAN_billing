import { createDocument, deleteDocument, findDocument, findDocumentByMultipleAttributes, getAllDocuments } from "../database/appwrite.queries";
import { getProductDetails } from "./product.controller";

const generateBill = (bill) =>{
    const {products, quantities, productPrices} = bill;
    let totals = [];
    let totalBill = 0;

    for(let i=0; i<products.length; i++){
        totals[i] = productPrices[i]*quantities[i];
        totalBill += totals[i];
    }

    bill.totals = totals;
    bill.totalBill = totalBill;

    return bill;
}

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
    
            const exist = await findDocument(process.env.APPWRITE_BILL_COLLECTION_ID, "$id", id);
            if(exist.response.total != 0){
                const bill = exist.response.documents[0];
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
    
    const {employee} = req.params;

    try {

        if(!employee){
            res.status(404).send({success:false, error: "Employee is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_BILL_COLLECTION_ID, "employee", employee);
            if(exist.response.total != 0){
                const bill = exist.response.documents[0];
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

const getBillsByClient = async(req, res)=> {
    
    const {client} = req.params;

    try {

        if(!client){
            res.status(404).send({success:false, error: "Client is required"});
        }
    
        else{
    
            const exist = await findDocument(process.env.APPWRITE_BILL_COLLECTION_ID, "client", client);
            if(exist.response.total != 0){
                const bill = exist.response.documents[0];
                res.status(200).send({success:true, bill});
            }
            else{
                res.status(404).send({success:false, message: "No such bill"});
            }    
        }
        
    } catch (e) {
        res.status(400).send({success:false, error:e.message});
    }

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

        const {billProducts, productPrices} = await getProductDetails(products);

        let billDetails = {
            employee,
            client,
            products: billProducts,
            quantities,
            productPrices
        };

        billDetails = generateBill(billDetails);

        const createBillResponse = await createDocument(process.env.APPWRITE_BILL_COLLECTION_ID, billDetails);
        if (createBillResponse.success) {
            const bill = createBillResponse.response;
            res.status(201).send({ success: true, bill });
        } 
        else {
            res.status(500).send({ success: false, error: "Could not make bill, please try again" });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ success: false, error: e.message });
    }
};


const deleteBill = async(req, res)=>{

    const {id} = req.body;

    try {

        if(!id){
            res.status(404).send({success:false, error: "Bill id is required"});
            return;
        }
    
        const deleteBillResponse = await deleteDocument(process.env.APPWRITE_BILL_COLLECTION_ID, id);

        if(deleteBillResponse.success) res.status(201).send({success:true, message: "Bill with id " + id + " is deleted"});
        else res.status(400).send({ success: false, error: "Could not delete bill, please try again" });
        
    } catch (e) {
        res.status(400).send({success:false, error:e.message});
    }

}



export { getBills, getBillByID, getBillsByClient, getBillsByEmployee, getBillsByDate, getBillsByDateRange, createBill, deleteBill }