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
exports.initPine = exports.indexName = exports.pc = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// interface {
// }
exports.pc = new pinecone_1.Pinecone({
    apiKey: "pcsk_62TRNo_SWbfbrsB34sb9gu7Gk19vLpYCgjyY1R1ptZhaEPbmLUNUZZLxU2YNwr9K2Yxmci"
    // apiKey:process.env.PINECONE_API_KEY
});
exports.indexName = 'quickstart';
const initPine = () => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        //@ts-ignore
        console.log(error.message);
    }
});
exports.initPine = initPine;
