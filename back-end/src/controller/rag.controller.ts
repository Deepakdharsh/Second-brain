import { Response,response } from "express"
import axios from "axios"
import {  Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from "@huggingface/inference"
import dotenv from "dotenv";
dotenv.config();

// const pc = new Pinecone({
//     apiKey: 'pcsk_62TRNo_SWbfbrsB34sb9gu7Gk19vLpYCgjyY1R1ptZhaEPbmLUNUZZLxU2YNwr9K2Yxmci'
//   });

// export const initPine=async()=>{
//     const indexName = 'quickstart';

//     await pc.createIndex({
//     name: indexName,
//     dimension: 384, // Replace with your model dimensions
//     metric: 'cosine', // Replace with your model metric
//     spec: { 
//         serverless: { 
//         cloud: 'aws', 
//         region: 'us-east-1' 
//         }
//     } 
//     });
// }
// // sentence-transformers/all-MiniLM-L6-v2
// "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"
const val=process.env.HF
const inference = new HfInference(val?.trim())

export const rag=async(req:Request,res:Response)=>{
    console.log(process.env.HF+""+"someONe")
    console.log(typeof process.env.HF)
    console.log("hello from rag")
    //@ts-ignore
    const {text}=req.body
    
    const output=await inference.featureExtraction({
        model:"sentence-transformers/all-MiniLM-L6-v2",
        inputs:text
    })

    res.json({
        output
    })
}