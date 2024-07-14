import {
  createDocument,
  deleteDocument,
  findDocument,
  findDocumentByStartsWith,
  findDocumentsWithinRange,
  getAllDocuments,
} from "../database/appwrite.queries.js";
import { getProductDetails } from "./product.controller.js";

const generateBill = (bill) => {
  const { products, quantities, productPrices } = bill;
  let totals = [];
  let totalBill = 0;

  for (let i = 0; i < products.length; i++) {
    totals[i] = productPrices[i] * quantities[i];
    totalBill += totals[i];
  }

  bill.totals = totals;
  bill.totalBill = totalBill;

  return bill;
};

const getBills = async (req, res) => {
  try {
    const billResponse = await getAllDocuments(
      process.env.APPWRITE_BILL_COLLECTION_ID
    );
    if (billResponse.response.total != 0) {
      const bills = billResponse.response.documents;
      res.status(200).send({ success: true, bills });
    } else {
      res.status(404).send({ success: false, message: "No bills found" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getBillByID = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(404).send({ success: false, error: "Bill id is required" });
    } else {
      const exist = await findDocument(
        process.env.APPWRITE_BILL_COLLECTION_ID,
        "$id",
        id
      );
      if (exist.response.total != 0) {
        const bill = exist.response.documents[0];
        res.status(200).send({ success: true, bill });
      } else {
        res.status(404).send({ success: false, message: "No such bill" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getBillsByEmployee = async (req, res) => {
  const { employee } = req.params;

  try {
    if (!employee) {
      res.status(404).send({ success: false, error: "Employee is required" });
    } else {
      const exist = await findDocument(
        process.env.APPWRITE_BILL_COLLECTION_ID,
        "employee",
        employee
      );
      if (exist.response.total != 0) {
        const bill = exist.response.documents[0];
        res.status(200).send({ success: true, bill });
      } else {
        res.status(404).send({ success: false, message: "No such bill" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getBillsByClient = async (req, res) => {
  const { client } = req.params;

  try {
    if (!client) {
      res.status(404).send({ success: false, error: "Client is required" });
    } else {
      const exist = await findDocument(
        process.env.APPWRITE_BILL_COLLECTION_ID,
        "client",
        client
      );
      if (exist.response.total != 0) {
        const bill = exist.response.documents[0];
        res.status(200).send({ success: true, bill });
      } else {
        res.status(404).send({ success: false, message: "No such bill" });
      }
    }
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const getBillsByDate = async (req, res) => {
  const { date } = req.body;
  if (!date) {
    console.log("Date is required");
    res.status(404).send({ success: false, error: "Date is required" });
    return;
  }

  try {
    const exist = await findDocumentByStartsWith(
      process.env.APPWRITE_BILL_COLLECTION_ID,
      "$createdAt",
      date
    );
    if (exist.response.total === 0) {
      res
        .status(404)
        .send({ success: false, error: "No bills found on this date" });
    } else {
      const bills = exist.response.documents;
      res.status(200).send({ success: true, bills });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const getBillsByDateRange = async (req, res) => {
  let { date1, date2 } = req.body;
  if (!date1 || !date2) {
    console.log("Both dates are required");
    res.status(400).send({ success: false, error: "Both dates are required" });
    return;
  }

  date1 = date1 + "T00:00:00.000+00:00";
  date2 = date2 + "T23:59:59.999+00:00";

  try {
    const exist = await findDocumentsWithinRange(
      process.env.APPWRITE_BILL_COLLECTION_ID,
      "$createdAt",
      date1,
      date2
    );

    if (exist.success && exist.response.total === 0) {
      res
        .status(404)
        .send({ success: false, error: "No bills found in this date range" });
    } else if (exist.success) {
      const bills = exist.response.documents;
      res.status(200).send({ success: true, bills });
    } else {
      res.status(400).send({ success: false, error: exist.error });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const createBill = async (req, res) => {
  const { employee, client, products } = req.body;
  let quantities = [];
  let totals = [];

  try {
    if (!employee || !client || products.length === 0) {
      res.status(400).send({ success: false, error: "All fields required" });
      return;
    }

    for (let product of products) {
      quantities.push(product.quantity);
      totals.push(product.total);
    }
    console.log(employee, client, products, quantities, totals);

    const { billProducts, productPrices } = await getProductDetails(products);

    let billDetails = {
      employee,
      client,
      products: billProducts,
      quantities,
      productPrices,
    };

    billDetails = generateBill(billDetails);

    const createBillResponse = await createDocument(
      process.env.APPWRITE_BILL_COLLECTION_ID,
      billDetails
    );
    if (createBillResponse.success) {
      const bill = createBillResponse.response;
      res.status(201).send({ success: true, bill });
    } else {
      res.status(500).send({
        success: false,
        error: "Could not make bill, please try again",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, error: e.message });
  }
};

const deleteBill = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      res.status(404).send({ success: false, error: "Bill id is required" });
      return;
    }

    const deleteBillResponse = await deleteDocument(
      process.env.APPWRITE_BILL_COLLECTION_ID,
      id
    );

    if (deleteBillResponse.success)
      res
        .status(201)
        .send({ success: true, message: "Bill with id " + id + " is deleted" });
    else
      res.status(400).send({
        success: false,
        error: "Could not delete bill, please try again",
      });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

export {
  getBills,
  getBillByID,
  getBillsByClient,
  getBillsByEmployee,
  getBillsByDate,
  getBillsByDateRange,
  createBill,
  deleteBill,
};
