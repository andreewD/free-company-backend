import Joi from "joi";

export const itemSchema = Joi.object().keys({
    id: Joi.string().required()
})

export const newItemSchema = Joi.object().keys({
    names: Joi.string().required(),
    category: Joi.number().required(),
    description: Joi.string().required(),
    images: Joi.array().required(),
    dataSheet: Joi.string().required()
})