import { Application, Request, Response } from 'express';
import { GetProductValidation } from './validators/get.product';
import { AppDataSource } from '../db/database';
import { Product } from '../db/models/product';

export const initHandlers = (app: Application) => {
    app.get("/ping", (request: Request, response: Response) => {
        response.send({"message": "Hello world"})
    });

    app.get("/products/:id", async (request: Request, response: Response) => {
        try {
            const validProduct = GetProductValidation.validate(request.params);
            if (validProduct.error) {
                response.status(400).send(validProduct.error.details);
                return;
            }
            const getProductRequest = validProduct.value;
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOne({
                where: { id: getProductRequest.id }
            });
            if (product === null) {
                response.status(404).send({message: "resource not found"});
                return;
            }
            response.status(200).send(product);
        } catch (error) {
            response.status(500).send({message: `internal error ${error}`});            
        } finally {
            return;
        }
    });
};