import { Response, Request, Router, NextFunction } from "express";
import { idSchema, newUserSchema } from "./schemas";
import { ValidationError } from "joi";

import httpErrors from "http-errors";
import { UserService } from "services";
import { response } from "network";
import { CustomError, GE } from "utils";

const User = Router();

// General methods for users path
User.route("/users")
    .post(
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const {
                body: { args },
            } = req;
            try {
                await newUserSchema.validateAsync(args);
                const us = new UserService(args);
                const result = await us.process({ type: "newUser" });
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
            const us = new UserService();
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

// Get user by id
User.route("/user/:id").get(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            params: { id },
        } = req;
        try {
            await idSchema.validateAsync(id);
            const us = new UserService({ id });
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

export { User };
