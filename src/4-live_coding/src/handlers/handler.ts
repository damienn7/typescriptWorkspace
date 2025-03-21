import { Application, Request, Response } from 'express';
import { GetProductValidation } from './validators/get.product';
import { AppDataSource } from '../db/database';
import { Product } from '../db/models/product';
import { PatchProductValidationId, PatchProductValidationName, PatchProductValidationPrice } from './validators/patch.product';

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
            response.status(500).send({message: `internal server error : ${error}`});            
        } finally {
            return;
        }
    });

    app.delete("/products/:id", async (request: Request, response: Response) => {
        try {
            const validProduct = GetProductValidation.validate(request.params);
            if (validProduct.error) {
                response.status(400).send(validProduct.error.details);
                return;
            }
            const getProductRequest = validProduct.value;
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOneBy({
                id: getProductRequest.id
            });
            if (product === null) {
                response.status(404).send({message: "resource not found"});
                return;
            }

            const removed = await productRepository.remove(product);

            response.status(200).send({message: `product removed with success : ${JSON.stringify(removed)}`});
        } catch (error) {
            response.status(500).send({message: `internal server error : ${error}`});            
        } finally {
            return;
        }
    });

    app.patch("/products/:id", async (request: Request, response: Response) => {
        try {
            if (Object.entries(request.body).length == 0) {
                response.status(400).send({ message: `bad request ${JSON.stringify(request.body)}` });
                return;
            }

            const validProduct = PatchProductValidationId.validate(request.params);
            if (validProduct.error) {
                response.status(400).send({ message: validProduct.error.details });
                return;
            }

            // get product
            const getProductRequest = validProduct.value;
            const productRepository = AppDataSource.getRepository(Product);
            const product = await productRepository.findOneBy({
                id: getProductRequest.id
            });

            if (product === null) {
                response.status(404).send({ message: "product not found" });
                return;
            }

            
            const productInst = new Product(product.id, product.name, product.price, product.createdAt, product.updatedAt);

            for (const [key, value] of Object.entries(request.body)) {
                switch (key) {
                    case 'name':
                        // make validator
                        const validProductName = PatchProductValidationName.validate({name: value});
                        if (validProductName.error) {
                            response.status(400).send({ message: validProductName.error.details });
                            return;
                        }
                        productInst.name = validProductName.value.name;
                        break;
                    case 'price':
                        // make validator
                        const validProductPrice = PatchProductValidationPrice.validate({price: value});
                        if (validProductPrice.error) {
                            response.status(400).send({ message: validProductPrice.error.details });
                            return;
                        }
                        productInst.price = validProductPrice.value.price;
                        break;
                    default:
                       break;
                }
            }

            productInst.updatedAt = new Date();
            // update product
            productRepository.save(productInst);
            response.status(200).send(productInst);
        } catch (error) {
            response.status(500).send({ message: `internal server error : ${error}`})
        } finally {
            return;
        }
    });

    app.post("/auth/signup", async  () => {
        try {
            
        } catch (error) {
            
        } finally {
            
        }
    })
};