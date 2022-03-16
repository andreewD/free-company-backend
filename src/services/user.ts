import httpErrors from 'http-errors'
import { User } from 'database'
import { errorHandling } from './utils'
import { GE } from 'utils'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
type Process = {
    type: 'getOne' | 'getAll' | 'newUser' | 'deleteUser' | 'updateUser'
}

type UserRequest = DtoUserFind | DtoUserNew | null
type UserResponse = UserResult

class UserService {
    private _args: UserRequest

    constructor(args: UserRequest = null) {
        this._args = args

    }

    public async process({ type }: Process): Promise<UserResponse> {
        switch (type) {
            case 'getAll':
                return await this._getAll()
            case 'getOne':
                return await this._getOne()
            case 'newUser':
                return await this._newUser()
            default:
                throw new httpErrors.InternalServerError()
        }
    }

    private async _getOne(): Promise<UserResult[] | any> {
        try {

            const { id } = this._args as DtoUserFind
            const users = await User.findAll({
                where: {
                    id: id
                },
                attributes: ['id', 'names', 'lastname', 'email', 'deleted', 'createdAt', 'updatedAt']
            })

            const response: UserResult[] = users.map(user => ({
                id: user?.id,
                names: user?.names || '',
                lastname: user?.lastname || '',
                email: user?.email || '',
                deleted: user?.deleted,
                createdAt: user?.createdAt,
                updatetAt: user?.updatedAt,

            }))
            return response
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }
    private async _getAll(): Promise<UserResult[] | any> {
        try {
            const users = await User.findAll()
            const response: UserResult[] = users.map(user => ({
                id: user?.id,
                names: user?.names || '',
                lastname: user?.lastname || '',
                email: user?.email || '',
                deleted: user.deleted,
                createdAt: user.createdAt,
                updatetAt: user.updatedAt,

            }))
            return response
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }
    private async _newUser(): Promise<UserResult[] | any> {
        try {
            const { names, lastname, email, password } = this._args as DtoUserNew
            const now = new Date()
            const users = await User.create({
                id: uuidv4(),
                names: names,
                lastname: lastname,
                email: email,
                password: await bcrypt.hash(password, 10),
                deleted: 0,
                createdAt: now,
                updatedAt: now
            })
            const response = {
                'id': users.id,
                'names': users.names,
                'lastname': users.lastname,
                'email': users.email,
                'createdAt': users.createdAt,
                'updatedAt': users.updatedAt
            }
            return response

        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }



}
export { UserService }