import { Query } from 'node-appwrite';
import {sdk, client, databases} from './appwrite.connect';

const findDocument = async(collectionId, attribute, value) =>{

    try {
        
        const response = await databases.listDocuments(
            process.env.APPWRITE_DB_ID, collectionId, [
            Query.equal(attribute, [value])
        ]);
        return response;

    } catch (err) {
        console.log(err);
    }

}

const findDocumentByMultipleAttributes = async (collectionId, attributes) => {
    try {
        // Construct the query array
        const queries = attributes.map(attribute => {
            return Query.equal(attribute.name, attribute.value);
        });

        // Perform the search
        const response = await databases.listDocuments(
            process.env.APPWRITE_DB_ID, collectionId, queries
        );
        
        return response;
    } catch (err) {
        console.error("Error finding document by attributes:", err);
    }
}


const createDocument = async(collectionId, userData) =>{

    try {
        
        const response = await databases.createDocument(
            process.env.APPWRITE_DB_ID, collectionId, sdk.ID.unique(), userData
        );
        return response;

    } catch (err) {
        console.log(err);
    }

}

const deleteDocument = async(collectionId, documentId) => {

    try {
        
        const response = await databases.deleteDocument(
            process.env.APPWRITE_DB_ID, collectionId, documentId
        );
        return response;

    } catch (err) {
        console.log(err);
    }

}

const updateDocument = async(collectionId, documentId, updates) => {

    try {
        
        const response = await databases.updateDocument(
            process.env.APPWRITE_DB_ID, collectionId, documentId,updates
        );
        return response;

    } catch (err) {
        console.log(err);
    }

}



export { findDocument, findDocumentByMultipleAttributes, createDocument, deleteDocument, updateDocument }