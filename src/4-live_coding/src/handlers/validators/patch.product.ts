import Joi from "joi";

export const PatchProductValidationId = Joi.object<ProductId>({
    id: Joi.number().required()
});

export const PatchProductValidationName = Joi.object<ProductName>({
    name: Joi.string().required()
});

export const PatchProductValidationPrice = Joi.object<ProductPrice>({
    price: Joi.number().required()
});

export interface ProductId {
    id: number
}

export interface ProductName {
    name: string
}

export interface ProductPrice {
    price: number
}