import { getAllDocuments } from "../database/appwrite.queries";

const getBills = async(req, res)=> {
    
    try {

        const billResponse = await getAllDocuments(process.env.APPWRITE_PRODUCT_COLLECTION_ID);
        // if(billResponse.response.total != 0){
        //     const bills = billResponse.response.documents;
        //     res.status(200).send({success:true, bills});
        // }
        // else{
        //     res.status(404).send({success:false, message: "No bills found"});
        // }
        res.send(billResponse);
                
    } catch (e) {
        console.log(e);
        res.status(400).send({success:false, error:e.message});
    }

}

const getBillByID = async(req, res)=> {
    console.log("Get Bill");
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

const createBill = async(req, res)=> {
    console.log("Set Bill");
}

const deleteBill = async(req, res)=> {
    console.log("Set Bill");
}



export { getBills, getBillByID, getBillsByClient, getBillsByEmployee, getBillsByDate, getBillsByDateRange, createBill, deleteBill }

//dummy