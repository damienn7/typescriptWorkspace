"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const handler_1 = require("./handlers/handler");
const app = () => {
    const app = (0, express_1.default)();
    const port = 3000;
    app.use(express_1.default.json());
    (0, handler_1.initHandlers)(app);
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
};
exports.app = app;
(0, exports.app)();
