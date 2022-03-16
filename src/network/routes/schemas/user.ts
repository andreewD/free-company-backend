import Joi from "joi";

export const userSchema = Joi.object().keys({
    id: Joi.string().required()
})

export const newUserSchema = Joi.object().keys({
    names: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})