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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const user_route_1 = require("./routes/user.route");
const pine_1 = require("./config/pine");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"]
}));
app.use("/api/v1", user_route_1.UserRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.db)();
            yield (0, pine_1.initPine)();
            app.listen(process.env.PORT, () => {
                console.log(`server is running on port:${process.env.PORT} and your DB is connected`);
            });
        }
        catch (error) {
            //@ts-ignore
            console.log(error.message);
        }
    });
}
main();
