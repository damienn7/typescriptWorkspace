import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/database";
import { Token } from "../db/models/token";
import { verify } from "jsonwebtoken";

export const authMiddleware = async (nf: NextFunction, req: Request, res: Response) => {
    try {
        const headerAuth = req.headers.authorization;

        if (headerAuth === undefined) {
            res.status(401).send({"message":"unauthorized user"});
            return;
        }

        const headerSplit = headerAuth.split(" ");
        if (headerSplit.length < 2) {
            res.status(401).send({"message" : "unauthorized user"});
            return;
        }

        const token = headerSplit[1];

        const tokenRepository = AppDataSource.getRepository(Token);
        const tokenFound = tokenRepository.findOneBy({
            token: token
        });

        if (tokenFound === null) {
            res.status(403).send({ "message": "access forbidden"});
            return;
        }

        verify(token, "valuerandom", (err, user) => {
            if (err) {
                // trigger error 
                res.status(403).send({ "message": err});
                return;
            }
            // add user object to request
            (req as any).user = user;
            // next func
            nf();
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ "message": "internal server error" });
            return;
        }
    }
}