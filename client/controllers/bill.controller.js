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

export { getBills }