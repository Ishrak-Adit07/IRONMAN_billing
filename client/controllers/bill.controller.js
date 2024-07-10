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

export { getBills, getBillByID, getBillsByClient, getBillsByEmployee }