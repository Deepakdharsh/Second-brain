"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const Schema = mongoose_1.default.Schema;
const LinkSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});
exports.Link = mongoose_1.default.model("Link", LinkSchema);
