"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./presentation/exress-http/routes");
dotenv_1.default.config({
    path: ".env",
});
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use("/", routes_1.indexRouter);
const port = process.env.PORT || 4040;
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
