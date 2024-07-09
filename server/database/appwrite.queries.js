import {client, databases} from './appwrite.connect';

const createDocument = async(collectionId, userData) =>{

    try {
        
        const response = await databases.createDocument(process.env.APPWRITE_DB_ID, collectionId, 'unique()', userData);
        return response;

    } catch (err) {
        console.log(err);
    }

}

export {createDocument}