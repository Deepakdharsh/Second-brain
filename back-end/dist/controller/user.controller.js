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
exports.LinkShare = exports.createLink = exports.deleteContent = exports.getContent = exports.createContent = exports.createTag = exports.refresh = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const content_model_1 = require("../models/content.model");
const randomString_1 = require("../utils/randomString");
const link_model_1 = require("../models/link.model");
const tags_model_1 = require("../models/tags.model");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { username, email, password } = req.body;
    console.log(req.body);
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
    // const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:""})
    const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        sameSite: "strict"
    });
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
    console.log(req.body);
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
    //   const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        sameSite: "strict"
    });
    res.status(201).json({
        message: "user created",
        user: user,
        token
    });
});
exports.login = login;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello from refresh");
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invaild refresh token"
            });
        }
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        res.json({ token });
    });
});
exports.refresh = refresh;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { title } = req.body;
    const schema = zod_1.default.object({
        title: zod_1.default.string()
    });
    const { data, error } = schema.safeParse({ title });
    console.log(data);
    if (error) {
        return res.json(411).json({ message: "invaild inputs" });
    }
    const tag = yield tags_model_1.Tag.create({ title: data.title });
    res.status(201).json({
        tag
    });
});
exports.createTag = createTag;
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    //@ts-ignore
    const { link, type, tags, title } = req.body;
    console.log(req.body);
    const schema = zod_1.default.object({
        link: zod_1.default.string(),
        type: zod_1.default.string(),
        title: zod_1.default.string(),
        tags: zod_1.default.array(zod_1.default.string())
    });
    const { data, error } = schema.safeParse({
        link,
        type,
        title,
        tags
    });
    let tag = yield tags_model_1.Tag.findOne({ title });
    if (!tag) {
        tag = yield tags_model_1.Tag.create({ title });
    }
    console.log(data);
    if (error) {
        console.log(error);
        return res.status(411).json({ message: "invaild inputs" });
    }
    const content = yield content_model_1.Content.create({
        title: data.title,
        link: data.link,
        type: data.type,
        tags: tag._id,
        userId: userId
    });
    console.log(content);
    res.status(201).json({
        message: "content created",
        content
    });
});
exports.createContent = createContent;
const getContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const contents = yield content_model_1.Content.find({ userId }).populate({ path: "tags", select: "title" });
    if (!contents) {
        return res.status(401).json({
            message: "Not found"
        });
    }
    res.status(201).json({
        message: "match found",
        contents
    });
});
exports.getContent = getContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    //@ts-ignore
    const { contentId } = req.body;
    const schema = zod_1.default.object({
        contentId: zod_1.default.string(),
    });
    const { data, error } = schema.safeParse({
        contentId
    });
    if (error) {
        console.log(error);
        return res.status(411).json({ message: "invaild inputs" });
    }
    const deleteContent = yield content_model_1.Content.deleteOne({ userId, _id: contentId });
    console.log(deleteContent);
    res.status(201).json({
        message: "content deleted",
        deleteContent
    });
});
exports.deleteContent = deleteContent;
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    //@ts-ignore
    const { share } = req.body;
    const schema = zod_1.default.object({
        share: zod_1.default.boolean(),
    });
    const { data, error } = schema.safeParse({
        share
    });
    if (error) {
        console.log(error);
        return res.status(411).json({ message: "invaild inputs" });
    }
    if (!share) {
        yield link_model_1.Link.deleteOne(userId);
        return res.status(200).json({
            message: "deleted link",
        });
    }
    const randomId = (0, randomString_1.random)(6);
    const linkData = yield link_model_1.Link.create({
        hash: randomId,
        userId
    });
    res.status(201).json({
        message: "Link created",
        link: linkData.hash
    });
});
exports.createLink = createLink;
const LinkShare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { sharelink } = req.params;
    //@ts-ignore
    // console.log(req.sharelink)
    console.log(sharelink);
    const schema = zod_1.default.object({
        sharelink: zod_1.default.string(),
    });
    const { data, error } = schema.safeParse({
        sharelink
    });
    if (error) {
        console.log(error);
        return res.status(404).json({ message: "Page not found" });
    }
    // const user=await Link.findOne({hash:shareLink}).populate("userId")
    const user = yield link_model_1.Link.findOne({ hash: sharelink });
    console.log(user);
    //@ts-ignore
    const contents = yield content_model_1.Content.find({ userId: user.userId });
    res.status(201).json({
        contents
    });
});
exports.LinkShare = LinkShare;
