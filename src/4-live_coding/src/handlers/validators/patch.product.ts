import Joi from "joi";

export const PatchProductValidation = Joi.object<ProductId>({
    id: Joi.number().required()
});

export interface ProductId {
    id: number
}