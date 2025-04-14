"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const Schema = mongoose_1.default.Schema;
const TagsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
exports.Tag = mongoose_1.default.model("Tag", TagsSchema);
