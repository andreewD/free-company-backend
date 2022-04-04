import { Response, Request, Router, NextFunction } from "express";
import {
    idSchema,
    newItemSchema,
    getItemByBrandSchema,
    getItemByCategorySchema,
} from "./schemas";
import { ValidationError } from "joi";

import httpErrors from "http-errors";
import { ItemService } from "services";
import { response } from "network";
import { CustomError, GE } from "utils";

const Item = Router();

// General methods for Items path
Item.route("/items")
    .post(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const {
                body: { args },
            } = req;
            try {
                await newItemSchema.validateAsync(args);
                const us = new ItemService(args);
                const result = await us.process({ type: "newItem" });
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
            const us = new ItemService();
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

// Get Item by id
Item.route("/item/:id").get(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            params: { id },
        } = req;
        try {
            await idSchema.validateAsync(id);
            const us = new ItemService({ id });
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

Item.route("/item/brand").post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {
            body: { args },
        } = req;
        try {
            await getItemByBrandSchema.validateAsync(args);
            const us = new ItemService(args);
            const result = await us.process({ type: "getByBrand" });
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
);

Item.route("/item/category").post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {
            body: { args },
        } = req;
        try {
            await getItemByCategorySchema.validateAsync(args);
            const us = new ItemService(args);
            const result = await us.process({ type: "getByCategory" });
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
);

export { Item };
