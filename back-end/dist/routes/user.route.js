"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
// import { auth } from "../middlewares/auth.middleware"
const rag_controller_1 = require("../controller/rag.controller");
const UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
//@ts-ignore
UserRouter.post("/rag", rag_controller_1.rag);
//@ts-ignore
UserRouter.post("/signup", user_controller_1.signup);
//@ts-ignore
UserRouter.post("/login", user_controller_1.login);
