import Joi from "joi";

export const brandsSchema = Joi.object().keys({
    id: Joi.number().required()
})

export const newbrandsSchema = Joi.object().keys({

    name: Joi.string().required(),

})