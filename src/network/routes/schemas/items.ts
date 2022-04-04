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
    brand: Joi.string().required(),
    deleted: Joi.boolean().required()
})

export const getItemByBrandSchema = Joi.object().keys({
    brand: Joi.string().required()
})

export const getItemByCategorySchema = Joi.object().keys({
    category: Joi.string().required()
})