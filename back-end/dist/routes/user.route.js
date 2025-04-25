"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rag_controller_1 = require("../controller/rag.controller");
const UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
//@ts-ignore
UserRouter.post("/rag", rag_controller_1.rag);
//@ts-ignore
UserRouter.post("/signup", user_controller_1.signup);
//@ts-ignore
UserRouter.post("/login", user_controller_1.login);
//@ts-ignore
UserRouter.post("/refresh", user_controller_1.refresh);
//@ts-ignore
UserRouter.post("/content", auth_middleware_1.auth, user_controller_1.createContent);
//@ts-ignore
UserRouter.get("/content", auth_middleware_1.auth, user_controller_1.getContent);
//@ts-ignore
UserRouter.post("/tag", auth_middleware_1.auth, user_controller_1.createTag);
//@ts-ignore
UserRouter.delete("/content", auth_middleware_1.auth, user_controller_1.deleteContent);
//@ts-ignore
UserRouter.post("/brain/share", auth_middleware_1.auth, user_controller_1.createLink);
//@ts-ignore
UserRouter.get("/brain/:sharelink", user_controller_1.LinkShare);
