import Joi from "joi";

export const itemSchema = Joi.object().keys({
    id: Joi.string().required()
})

export const newItemSchema = Joi.object().keys({
    names: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().required(),
    dataSheet: Joi.string().required(),
    details1: Joi.string().allow(null, ''),
    details2: Joi.string().allow(null, ''),
    brand: Joi.string().required()
})

export const getAllItemsSchema = Joi.object().keys({
    // category: Joi.string().required().allow(null),
    // brand: Joi.string().required().allow(null),
    category: Joi.array().items(Joi.string()),
    brand: Joi.array().items(Joi.string()),
    page: Joi.number().required(),
    size: Joi.number().required()
})
