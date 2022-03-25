import Joi from 'joi'
const idSchema = Joi.string().length(36).required()
const idCatSchema = Joi.string().required()
export { idSchema, idCatSchema }
export * from './user'
export * from './items'
export * from './categories'