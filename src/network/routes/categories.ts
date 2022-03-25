import { Response, Request, Router, NextFunction } from 'express'
import { idCatSchema, idSchema, newcategoriesSchema } from './schemas'
import { ValidationError } from 'joi'

import httpErrors from 'http-errors'
import { CategoriesService } from 'services'
import { response } from 'network'
import { CustomError, GE } from 'utils'

const Categories = Router()

// General methods for Categoriess path 
Categories.route('/categories')
    .post(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {
            body: { args }
        } = req
        try {
            await newcategoriesSchema.validateAsync(args)
            const us = new CategoriesService(args)
            const result = await us.process({ type: 'newCategories' })
            response({ error: false, message: result, res, status: 201 })
        } catch (e) {
            let errors: string[] = []

            if (e instanceof ValidationError)
                errors = e.details.map(({ message }) => message)

            if (e instanceof CustomError && e.errors) return next(e)

            if (e instanceof httpErrors.HttpError) return next(e)

            const error = new CustomError(
                GE.INTERNAL_SERVER_ERROR,
                errors.length > 0 ? errors : [GE.INTERNAL_SERVER_ERROR]
            )
            console.log({ error })
            next(error)
        }
    })
    .get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const us = new CategoriesService()
        try {
            const result = await us.process({ type: 'getAll' })
            response({ error: false, message: result, res, status: 200 })
        } catch (e) {
            let errors: string[] = []

            if (e instanceof ValidationError)
                errors = e.details.map(({ message }) => message)

            if (e instanceof CustomError && e.errors) return next(e)

            if (e instanceof httpErrors.HttpError) return next(e)

            const error = new CustomError(
                GE.INTERNAL_SERVER_ERROR,
                errors.length > 0 ? errors : [GE.INTERNAL_SERVER_ERROR]
            )
            console.log({ error })
            next(error)
        }
    })

// Get Categories by id
Categories.route('/categories/:id')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        const {
            params: { id }
        } = req
        try {
            await idCatSchema.validateAsync(id)

            const us = new CategoriesService({ id })
            const result = await us.process({ type: 'getOne' })
            response({ error: false, message: result, res, status: 200 })
        } catch (e) {
            let errors: string[] = []

            if (e instanceof ValidationError)
                errors = e.details.map(({ message }) => message)

            if (e instanceof CustomError && e.errors) return next(e)

            if (e instanceof httpErrors.HttpError) return next(e)

            const error = new CustomError(
                GE.INTERNAL_SERVER_ERROR,
                errors.length > 0 ? errors : [GE.INTERNAL_SERVER_ERROR]
            )
            console.log({ error })
            next(error)
        }
    })

export { Categories }