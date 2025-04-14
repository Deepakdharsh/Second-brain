"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rag = void 0;
const inference_1 = require("@huggingface/inference");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const pc = new Pinecone({
//     apiKey: 'pcsk_62TRNo_SWbfbrsB34sb9gu7Gk19vLpYCgjyY1R1ptZhaEPbmLUNUZZLxU2YNwr9K2Yxmci'
//   });
// export const initPine=async()=>{
//     const indexName = 'quickstart';
//     await pc.createIndex({
//     name: indexName,
//     dimension: 384, // Replace with your model dimensions
//     metric: 'dotproduct', // Replace with your model metric
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
const val = process.env.HF;
const inference = new inference_1.HfInference(val === null || val === void 0 ? void 0 : val.trim());
const rag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.HF + "" + "someONe");
    console.log(typeof process.env.HF);
    console.log("hello from rag");
    //@ts-ignore
    const { text } = req.body;
    const output = yield inference.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: "That is a happy person"
    });
    res.json({
        output
    });
});
exports.rag = rag;
