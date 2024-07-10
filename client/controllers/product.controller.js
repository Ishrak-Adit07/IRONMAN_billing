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

const editProductPrice = async (name, type, newPrice) => {
    
    if (!name || !type || !newPrice) {
        throw Error("All fields are required");
    }

    try {
        const editProductPriceResponse = await fetch('/api/product/price', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, type, newPrice })
        });

        const responseData = await editProductPriceResponse.json();

        if (!editProductPriceResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }
}

const deleteProduct = async (name, type) => {
    
    if (!name || !type) {
        throw Error("All fields are required");
    }

    try {
        const deleteProductResponse = await fetch('/api/product/delete', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, type })
        });

        const responseData = await deleteProductResponse.json();

        if (!deleteProductResponse.ok) {
            throw Error(responseData.error);
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error.message);
        throw Error(error.message);
    }
}

export { getProducts, getProduct, editProductPrice, deleteProduct }