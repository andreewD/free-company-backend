import Joi from "joi";

export const categoriesSchema = Joi.object().keys({
    id: Joi.number().required()
})

export const newcategoriesSchema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),

})