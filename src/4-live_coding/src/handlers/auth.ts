import { Request, Response } from "express";
import { createUserValidation } from "./validators/post.user";
import { generateValidationErrorMessage } from "./validators/generateValidationError";
import bcrypt from 'bcrypt';
export const createUser = async (req: Request, res: Response) => {
    try {
        const validation = createUserValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }

        const user = validation.value;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
    } catch (error) {
        res.status(500).send({message: "internal server error"});
    } finally {
        return;
    }
};