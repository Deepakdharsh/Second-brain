import { Response,response } from "express"
import { HfInference } from "@huggingface/inference"
import dotenv from "dotenv";
import { indexName, pc } from "../config/pine";
dotenv.config();

const val=process.env.HF
const inference = new HfInference(val?.trim())

export const rag=async(req:Request,res:Response)=>{
    try {
        //@ts-ignore
        const {text}=req.body
        
        const output=await inference.featureExtraction({
            model:"sentence-transformers/all-MiniLM-L6-v2",
            inputs:text
        })
    
            const vectors = [
              {
                id: " doc-001",
                values: output,
                metadata: {text}
              },
            ]
        
    
        const index=pc.index(indexName)
        //@ts-ignore
        const data=await index.namespace("ns1").upsert(vectors)
        
        const response = await index.namespace('ns1').fetch([" doc-001"]);

        res.json({
            output,
            data,
            response
        })
    } catch (error) {
        //@ts-ignore
        console.log(error.message)
        res.json({
            message:"something went wrong"
        })
    }
}