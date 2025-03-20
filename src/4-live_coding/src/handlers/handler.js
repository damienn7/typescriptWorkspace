"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHandlers = void 0;
const initHandlers = (app) => {
    app.get("/ping", (request, response) => {
        response.send({ "message": "Hello world" });
    });
};
exports.initHandlers = initHandlers;
