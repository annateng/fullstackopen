"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3666;
const app = express_1.default();
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
