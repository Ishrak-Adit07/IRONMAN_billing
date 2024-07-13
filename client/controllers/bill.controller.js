const getBills = async() =>{

    try {
        const getBillsResponse = await fetch(`/api/bill`);
        const responseData = await getBillsResponse.json();

        if (!getBillsResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const getBillByID = async(id) =>{

    if (!id) {
        throw Error("Bill id is required");
    }

    try {
        const getBillResponse = await fetch(`/api/bill/get/id/:${id}`);
        const responseData = await getBillResponse.json();

        if (!registerResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const getBillsByClient = async(client) =>{

    if (!client) {
        throw Error("Bill client is required");
    }

    try {
        const getBillResponse = await fetch(`/api/bill/get/client/:${client}`);
        const responseData = await getBillResponse.json();

        if (!registerResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const getBillsByEmployee = async(employee) =>{

    if (!employee) {
        throw Error("Bill employee is required");
    }

    try {
        const getBillResponse = await fetch(`/api/bill/get/employee/:${employee}`);
        const responseData = await getBillResponse.json();

        if (!registerResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const getBillsByDate = async(date) =>{

    if (!date) {
        throw Error("Bill date is required");
    }

    try {
        const getBillResponse = await fetch('/api/bill/get/date', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ date })
        });
        const responseData = await getBillResponse.json();

        if (!registerResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const getBillsByDateRange = async(date1, date2) =>{

    if (!date1 || !date2) {
        throw Error("Bill dates are required");
    }

    try {
        const getBillResponse = await fetch('/api/bill/get/dates', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ date1, date2 })
        });
        const responseData = await getBillResponse.json();

        if (!registerResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const createBill = async(employee, client, products, quantities) =>{
    if (!employee || !client || products.length===0 || quantities.length===0) {
        throw Error("All fields are required");
    }

    try {
        const createBillResponse = await fetch('/api/bill/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ employee, client, products, quantities })
        });

        const responseData = await createBillResponse.json();

        if (!createBillResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }
}

const deleteBilll = async(id) =>{

    if (!id) {
        throw Error("Bill id is required");
    }

    try {
        const deleteBillResponse = await fetch('/api/bill/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });
        const responseData = await deleteBillResponse.json();

        if (!deleteBillResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}


export { getBills, getBillByID, getBillsByClient, getBillsByEmployee, getBillsByDate, getBillsByDateRange, createBill, deleteBilll }