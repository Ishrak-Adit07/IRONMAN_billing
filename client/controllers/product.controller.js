const getProducts = async() =>{

    try {
        const getProductsResponse = await fetch(`/api/product/`);
        const responseData = await getProductsResponse.json();

        if (!getProductsResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

const getProduct = async(name, type) =>{

    try {
        const getProductResponse = await fetch(`/api/product/:${name}/:${type}`);
        const responseData = await getProductResponse.json();

        if (!getProductResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }

}

export { getProducts, getProduct }