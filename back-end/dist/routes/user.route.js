"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
//@ts-ignore
UserRouter.post("/login", user_controller_1.login);
//@ts-ignore
UserRouter.post("/signup", user_controller_1.signup);
//@ts-ignore
UserRouter.post("/content", user_controller_1.createContent);
//@ts-ignore
UserRouter.get("/content", user_controller_1.getContent);
//@ts-ignore
UserRouter.delete("/content", user_controller_1.deleteContent);
//@ts-ignore
UserRouter.post("/brain/share", user_controller_1.createLink);
//@ts-ignore
UserRouter.get("/brain/:sharelink", user_controller_1.shareLink);
