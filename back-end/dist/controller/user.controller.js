"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareLink = exports.createLink = exports.deleteContent = exports.getContent = exports.createContent = exports.signup = exports.login = void 0;
const login = (req, res) => {
    console.log("hello");
    res.send("hello this from login controller");
};
exports.login = login;
const signup = (req, res) => {
    console.log("hello");
    res.send("hello this from signup controller");
};
exports.signup = signup;
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
