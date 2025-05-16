"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            //@ts-ignore
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log(decoded, "from the auth middleware");
            if (!decoded) {
                return res.status(401).json({
                    message: "invaild token"
                });
            }
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
    catch (error) {
        //@ts-ignore
        console.log(`Error in Auth middleware ${error.message}`);
        res.status(401).json({
            message: "Internal server error"
        });
    }
};
exports.auth = auth;
