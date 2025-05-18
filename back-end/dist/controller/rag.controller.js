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
exports.reply = exports.rag = void 0;
const inference_1 = require("@huggingface/inference");
const dotenv_1 = __importDefault(require("dotenv"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const content_model_1 = require("../models/content.model");
dotenv_1.default.config();
const val = process.env.HF;
const inference = new inference_1.HfInference(val === null || val === void 0 ? void 0 : val.trim());
const rag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const contents = yield content_model_1.Content.find({ userId }).populate({ path: "tags", select: "title" });
        res.json({
            contents
        });
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
    }
    catch (error) {
        //@ts-ignore
        console.log(error.message);
        res.json({
            message: "something went wrong"
        });
    }
});
exports.rag = rag;
const reply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.goto("http://localhost:5173/dashboard");
    // await page.waitForSelector()
    const scrapings = yield page.evaluate(() => {
        return document.querySelectorAll('.content-card');
    });
    // await browser.close()
    res.json({
        scrapings
    });
});
exports.reply = reply;
