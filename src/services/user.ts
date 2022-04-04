import httpErrors from "http-errors";
import { UserModel } from "database";
import { errorHandling } from "./utils";
import { GE } from "utils";
import bcrypt from "bcrypt";
type Process = {
    type: "getOne" | "getAll" | "newUser" | "deleteUser" | "updateUser";
};

type UserRequest = DtoUserFind | DtoUserNew | null;
type UserResponse = UserResult;

class UserService {
    private _args: UserRequest;

    constructor(args: UserRequest = null) {
        this._args = args;
    }

    public async process({ type }: Process): Promise<UserResponse> {
        switch (type) {
            case "getAll":
                return await this._getAll();
            case "getOne":
                return await this._getOne();
            case "newUser":
                return await this._newUser();
            default:
                throw new httpErrors.InternalServerError();
        }
    }

    private async _getOne(): Promise<UserResult[] | any> {
        try {
            const { id } = this._args as DtoUserFind;
            const users = await UserModel.findById(id);

            const response = users;
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
    private async _getAll(): Promise<UserResult[] | any> {
        try {
            const users = await UserModel.find({});
            const response = users;
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
    private async _newUser(): Promise<UserResult[] | any> {
        try {
            const { names, lastname, email, password } = this._args as DtoUserNew;
            const now = new Date();
            const users = new UserModel({
                names: names,
                lastname: lastname,
                email: email,
                password: await bcrypt.hash(password, 10),
                deleted: false,
            });
            await users.save();
            return users;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
}
export { UserService };
