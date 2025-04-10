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
exports.shareLink = exports.createLink = exports.deleteContent = exports.getContent = exports.createContent = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { username, email, password } = req.body;
    const schema = zod_1.default.object({
        username: zod_1.default.string(),
        email: zod_1.default.string(),
        password: zod_1.default.string()
    });
    const { data, error } = schema.safeParse({
        username,
        email,
        password
    });
    if (error) {
        console.log(error);
        return res.status(411).json({ message: "invaild inputs" });
    }
    const user = yield user_model_1.User.findOne({ email: data.email });
    if (user) {
        return res.status(403).json({ message: "user already exists" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const newUser = yield user_model_1.User.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
    });
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
        message: "user created",
        user: newUser,
        token
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { email, password } = req.body;
    const schema = zod_1.default.object({
        email: zod_1.default.string(),
        password: zod_1.default.string()
    });
    const { data, error } = schema.safeParse({
        email,
        password
    });
    if (error) {
        console.log(error);
        return res.status(411).json({ message: "invaild inputs" });
    }
    const user = yield user_model_1.User.findOne({ email: data.email });
    if (!user) {
        return res.status(401).json({ message: "invaild authorization" });
    }
    //@ts-ignore
    const isMatch = yield bcrypt_1.default.compare(data.password, user.password);
    if (!isMatch) {
        return res.status(403).json({
            message: "invaild credentails"
        });
    }
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({
        message: "user created",
        user: user,
        token
    });
});
exports.login = login;
const createContent = (req, res) => {
    console.log("hello");
    res.send("hello this from createContent controller");
};
exports.createContent = createContent;
const getContent = (req, res) => {
    console.log("hello");
    res.send("hello this from getContent controller");
};
exports.getContent = getContent;
const deleteContent = (req, res) => {
    console.log("hello");
    res.send("hello this from deleteContent controller");
};
exports.deleteContent = deleteContent;
const createLink = (req, res) => {
    console.log("hello");
    res.send("hello this from createLink controller");
};
exports.createLink = createLink;
const shareLink = (req, res) => {
    console.log("hello");
    res.send("hello this from shareLink controller");
};
exports.shareLink = shareLink;
