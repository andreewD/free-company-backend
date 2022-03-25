import httpErrors from 'http-errors'
import { Item } from 'database'
import { errorHandling } from './utils'
import { GE } from 'utils'
import { v4 as uuidv4 } from 'uuid'

type Process = {
    type: 'getOne' | 'getAll' | 'newItem' | 'deleteItem' | 'updateItem'
}

type ItemRequest = DtoItemFind | DtoItemNew | null
type ItemResponse = ItemResult

class ItemService {
    private _args: ItemRequest

    constructor(args: ItemRequest = null) {
        this._args = args

    }

    public async process({ type }: Process): Promise<ItemResponse> {
        switch (type) {
            case 'getAll':
                return await this._getAll()
            case 'getOne':
                return await this._getOne()
            case 'newItem':
                return await this._newItem()
            default:
                throw new httpErrors.InternalServerError()
        }
    }

    private async _getOne(): Promise<ItemResult[] | any> {
        try {

            const { id } = this._args as DtoItemFind
            const Items = await Item.findAll({
                where: {
                    id: id
                },
                attributes: ['id', 'names', 'category', 'images', 'dataSheet', 'deleted', 'createdAt', 'updatedAt']
            })

            const response: ItemResult[] = Items.map(Item => ({
                id: Item?.id,
                names: Item?.names || '',
                category: Item?.category || 0,
                description: Item?.description || '',
                images: Item?.images || [''],
                dataSheet: Item?.dataSheet || '',
                deleted: Item?.deleted,
                createdAt: Item?.createdAt,
                updatedAt: Item?.updatedAt,

            }))
            return response
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }
    private async _getAll(): Promise<ItemResult[] | any> {
        try {
            const Items = await Item.findAll()
            const response: ItemResult[] = Items.map(Item => ({
                id: Item?.id,
                names: Item?.names || '',
                category: Item?.category || 0,
                description: Item?.description || '',
                images: Item?.images || [''],
                dataSheet: Item?.dataSheet || '',
                deleted: Item?.deleted,
                createdAt: Item?.createdAt,
                updatedAt: Item?.updatedAt,

            }))
            return response
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }
    private async _newItem(): Promise<ItemResult[] | any> {
        try {
            const { names, category, description, images, dataSheet } = this._args as DtoItemNew
            const now = new Date()
            const Items = await Item.create({
                id: uuidv4(),
                names: names,
                category: category || 0,
                description: description || '',
                images: images || [''],
                dataSheet: dataSheet || '',
                deleted: 0,
                createdAt: now,
                updatedAt: now,

            })
            const response = {
                'id': Items.id,
                'names': Items.names,
                'category': Items.category,
                "description": Items.description,
                'images': Items.images,
                'createdAt': Items.createdAt,
                'updatedAt': Items.updatedAt
            }
            return response

        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR)
        }
    }



}
export { ItemService }