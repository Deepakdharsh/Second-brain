import { Request, Response } from "express"
import { HfInference } from "@huggingface/inference"
import dotenv from "dotenv";
import { indexName, pc } from "../config/pine";
import puppeteer from "puppeteer";
import { Content } from "../models/content.model";
dotenv.config();

const val=process.env.HF
const inference = new HfInference(val?.trim())

export const rag=async(req:Request,res:Response)=>{
    try {
        //@ts-ignore
    const userId=req.userId

    const contents=await Content.find({userId}).populate({path:"tags",select:"title"})

    res.json({
        contents
    })
        
        // const output=await inference.featureExtraction({
        //     model:"sentence-transformers/all-MiniLM-L6-v2",
        //     inputs:text
        // })
    
        //     const vectors = [
        //       {
        //         id: " doc-001",
        //         values: output,
        //         metadata: {text}
        //       },
        //     ]
         
    
        // const index=pc.index(indexName)
        // //@ts-ignore
        // const data=await index.namespace("ns1").upsert(vectors)
        
        // const response = await index.namespace('ns1').fetch([" doc-001"]);

        // res.json({
        //     output,
        //     data,
        //     response
        // })
    } catch (error) {
        //@ts-ignore
        console.log(error.message)
        res.json({
            message:"something went wrong"
        })
    }
}

export const reply=async(req:Request,res:Response)=>{
    const browser=await puppeteer.launch({headless:false})
    const page=await browser.newPage()

    await page.goto("http://localhost:5173/dashboard")

    // await page.waitForSelector()

    const scrapings=await page.evaluate(()=>{
        return document.querySelectorAll('.content-card')
    })

    // await browser.close()

    res.json({
        scrapings
    })

}