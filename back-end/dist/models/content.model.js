"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const Schema = mongoose_1.default.Schema;
const ContentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["image", "video", "article", "audio", "youtube", "twitter"],
        required: true
    },
    tags: [{ type: ObjectId, ref: "Tag" }],
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});
exports.Content = mongoose_1.default.model("Content", ContentSchema);
