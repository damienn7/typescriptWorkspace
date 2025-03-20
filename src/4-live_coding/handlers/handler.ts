import { Application, Request, Response } from 'express';

export const initHandlers = (app: Application) => {
    app.get("/ping", (request: Request, response: Response) => {
        response.send({"message": "Hello world"})
    });
};