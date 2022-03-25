import httpErrors from 'http-errors'
import { Categories } from 'database'
import { errorHandling } from './utils'
import { GE } from 'utils'
import { v4 as uuidv4 } from 'uuid'

type Process = {
    type: 'getOne' | 'getAll' | 'newCategories' | 'deleteCategories' | 'updateCategories'
}

type CategoriesRequest = DtoCategoriesFind | DtoCategoriesNew | null
type CategoriesResponse = CategoriesResult

class CategoriesService {
    private _args: CategoriesRequest

    constructor(args: CategoriesRequest = null) {
        this._args = args

    }

    public async process({ type }: Process): Promise<CategoriesResponse> {
        switch (type) {
            case 'getAll':
                return await this._getAll()
            case 'getOne':
                return await this._getOne()
            case 'newCategories':
                return await this._newCategories()
            default:
                throw new httpErrors.InternalServerError()
        }
    }

    private async _getOne(): Promise<CategoriesResult[] | any> {
        try {

            const { id } = this._args as DtoCategoriesFind
            const Categoriess = await Categories.findAll({
                where: {
                    id: parseInt(id)
                },
                attributes: ['id', 'name']
            })

            const response: CategoriesResult[] = Categoriess.map(Categories => ({
                id: Categories?.id,
                name: Categories?.name || '',


            }))
            return response
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }
    private async _getAll(): Promise<CategoriesResult[] | any> {
        try {
            const Categoriess = await Categories.findAll()
            const response: CategoriesResult[] = Categoriess.map(Categories => ({
                id: Categories?.id,
                name: Categories?.name || '',


            }))
            return response
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }
    private async _newCategories(): Promise<CategoriesResult[] | any> {
        try {
            const { id, name } = this._args as DtoCategoriesNew
            const now = new Date()
            const Categoriess = await Categories.create({
                id: id,
                name: name,
                createdAt: now,
                updatedAt: now

            })
            const response = {
                'id': Categoriess.id,
                'name': Categoriess.name,
                'createdAt': Categoriess.createdAt,
                'updatedAt': Categoriess.updatedAt
            }
            return response

        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }



}
export { CategoriesService }