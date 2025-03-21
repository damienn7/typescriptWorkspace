import { Request, Response } from "express";
import { createUserValidation } from "./validators/post.user";
import { generateValidationErrorMessage } from "./validators/auth/generateValidationError";
import bcrypt from 'bcrypt';
import { AppDataSource } from "../db/database";
import { User } from "../db/models/user";
import { QueryFailedError } from "typeorm";
import jwt from "jsonwebtoken";
import { Token } from "../db/models/token";
export const createUser = async (req: Request, res: Response) => {
    try {
        const validation = createUserValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }

        const user = validation.value;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const userRepository = AppDataSource.getRepository(User);
        
        const userSaved = await userRepository.save({
            email: user.email,
            password: hashedPassword
        });

        res.status(201).send({
            id: userSaved.id,
            email: user.email,
            created_at: userSaved.createdAt,
            updated_at: userSaved.updatedAt
        });
    } catch (error) {
        if (error instanceof QueryFailedError && error.driverError.code === "23505") {
            res.status(400).send({"message": "user email already exist"});
        }

        if (error instanceof Error) {
            console.log(error.message);
            return;
        }
        res.status(500).send({"message": "internal server error"});
    } finally {
        return;
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validation = createUserValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }

        const user = validation.value;
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: user.email });

        if (userFound == null) {
            res.status(400).send({"message": "user not found"});
            return;
        }

        const isValid = bcrypt.compare(user.password, userFound.password);

        if (!isValid) {
            res.status(400).send({"message": "user password is invalid"});
            return;
        }

        const secret = "valuerandom";
        const token = jwt.sign({ userId: userFound.id, email: user.email }, secret, {expiresIn: '1h'});
        // create token in database
        
        const tokenRepository = AppDataSource.getRepository(Token);
        const tokenSaved = tokenRepository.save({
            token: token,
            userId: userFound
        });

        res.status(201).send({ "message": "user successfully connected" });

    } catch (error) {
        if (error instanceof QueryFailedError && error.driverError.code === "23505") {
            res.status(400).send({"message": "user email already exist"});
        }

        if (error instanceof Error) {
            console.log(error.message);
            return;
        }
        res.status(500).send({"message": "internal server error"});
    } finally {
        return;
    }
};