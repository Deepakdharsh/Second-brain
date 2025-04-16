"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        //@ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.id;
            next();
        }
        else {
            return res.status(401).json({
                message: "invaild token"
            });
        }
    }
    else {
        return res.status(401).json({
            message: "invaild token"
        });
    }
};
exports.auth = auth;
