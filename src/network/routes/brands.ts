import { Response, Request, Router, NextFunction } from "express";
import { idCatSchema, idSchema, newbrandsSchema } from "./schemas";
import { ValidationError } from "joi";

import httpErrors from "http-errors";
import { BrandsService } from "services";
import { response } from "network";
import { CustomError, GE } from "utils";

const Brands = Router();

// General methods for Brands path
Brands.route("/brands")
    .post(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const {
                body: { args },
            } = req;
            try {
                await newbrandsSchema.validateAsync(args);
                const us = new BrandsService(args);
                const result = await us.process({ type: "newBrands" });
                response({ error: false, message: result, res, status: 201 });
            } catch (e) {
                let errors: string[] = [];

                if (e instanceof ValidationError)
                    errors = e.details.map(({ message }) => message);

                if (e instanceof CustomError && e.errors) return next(e);

                if (e instanceof httpErrors.HttpError) return next(e);

                const error = new CustomError(
                    GE.INTERNAL_SERVER_ERROR,
                    errors.length > 0 ? errors : [GE.INTERNAL_SERVER_ERROR]
                );
                console.log({ error });
                next(error);
            }
        }
    )
    .get(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const us = new BrandsService();
            try {
                const result = await us.process({ type: "getAll" });
                response({ error: false, message: result, res, status: 200 });
            } catch (e) {
                let errors: string[] = [];

                if (e instanceof ValidationError)
                    errors = e.details.map(({ message }) => message);

                if (e instanceof CustomError && e.errors) return next(e);

                if (e instanceof httpErrors.HttpError) return next(e);

                const error = new CustomError(
                    GE.INTERNAL_SERVER_ERROR,
                    errors.length > 0 ? errors : [GE.INTERNAL_SERVER_ERROR]
                );
                console.log({ error });
                next(error);
            }
        }
    );

// Get Brands by id
Brands.route("/brands/:id").get(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            params: { id },
        } = req;
        try {
            await idCatSchema.validateAsync(id);

            const us = new BrandsService({ id });
            const result = await us.process({ type: "getOne" });
            response({ error: false, message: result, res, status: 200 });
        } catch (e) {
            let errors: string[] = [];

            if (e instanceof ValidationError)
                errors = e.details.map(({ message }) => message);

            if (e instanceof CustomError && e.errors) return next(e);

            if (e instanceof httpErrors.HttpError) return next(e);

            const error = new CustomError(
                GE.INTERNAL_SERVER_ERROR,
                errors.length > 0 ? errors : [GE.INTERNAL_SERVER_ERROR]
            );
            console.log({ error });
            next(error);
        }
    }
);

export { Brands };
