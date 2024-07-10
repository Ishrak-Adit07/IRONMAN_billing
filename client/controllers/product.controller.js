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

    let getProductResponse;

    if(!type){
        try {
            getProductResponse = await fetch(`/api/product/name/:${name}`);
        } catch (error) {
            console.error("Error:", error.message);
            throw Error(error.message);
        }
    }

    else if(!name){
        try {
            getProductResponse = await fetch(`/api/product/type/:${type}`);
        } catch (error) {
            console.error("Error:", error.message);
            throw Error(error.message);
        }
    }

    else{
        try {

            getProductResponse = await fetch(`/api/product/:${name}/:${type}`);
    
        } catch (error) {
            console.error("Error:", error.message);
            throw Error(error.message);
        }
    }

    try {
        const responseData = await getProductResponse.json();
    
        if (!getProductResponse.ok) {
            throw Error(responseData.error);
        }
    
        return responseData;
    } catch (error) {
        
    }

}

export { getProducts, getProduct }