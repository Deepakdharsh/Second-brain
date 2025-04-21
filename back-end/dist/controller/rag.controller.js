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
const pine_1 = require("../config/pine");
dotenv_1.default.config();
const val = process.env.HF;
const inference = new inference_1.HfInference(val === null || val === void 0 ? void 0 : val.trim());
const rag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const { text } = req.body;
        const output = yield inference.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: text
        });
        const vectors = [
            {
                id: " doc-001",
                values: output,
                metadata: { text }
            },
        ];
        const index = pine_1.pc.index(pine_1.indexName);
        //@ts-ignore
        const data = yield index.namespace("ns1").upsert(vectors);
        const response = yield index.namespace('ns1').fetch([" doc-001"]);
        res.json({
            output,
            data,
            response
        });
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
