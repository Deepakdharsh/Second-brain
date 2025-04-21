import {  Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();

// interface {

// }

export const pc = new Pinecone({
    apiKey:"pcsk_62TRNo_SWbfbrsB34sb9gu7Gk19vLpYCgjyY1R1ptZhaEPbmLUNUZZLxU2YNwr9K2Yxmci"
    // apiKey:process.env.PINECONE_API_KEY
});

export const indexName = 'quickstart';

export const initPine=async()=>{
    try {
    
        // await pc.createIndex({
        // name: indexName,
        // dimension: 384, // Replace with your model dimensions
        // metric: 'cosine', // Replace with your model metric
        // spec: { 
        //     serverless: { 
        //     cloud: 'aws', 
        //     region: 'us-east-1' 
        //     }
        // } 
        // });
    } catch (error) {
        //@ts-ignore
        console.log(error.message)
    }
}
