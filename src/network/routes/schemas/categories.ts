import Joi from "joi";

export const categoriesSchema = Joi.object().keys({
    id: Joi.number().required()
})

export const newcategoriesSchema = Joi.object().keys({

    name: Joi.string().required(),

})