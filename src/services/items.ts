import httpErrors from "http-errors";
import { ItemModel } from "database";
import { errorHandling } from "./utils";
import { GE } from "utils";
type Process = {
    type:
    | "getOne"
    | "getAll"
    | "newItem"
    | "updateItem"
};

type ItemRequest =
    | DtoItemFind
    | DtoItemNew
    | DtoFindAll
    | null

type ItemResponse = ItemResult;

class ItemService {
    private _args: ItemRequest;

    constructor(args: ItemRequest = null) {
        this._args = args;
    }

    public async process({ type }: Process): Promise<ItemResponse> {
        switch (type) {
            case "getAll":
                return await this._getAll();
            case "getOne":
                return await this._getOne();
            case "newItem":
                return await this._newItem();
            default:
                throw new httpErrors.InternalServerError();
        }
    }

    private async _getOne(): Promise<ItemResult[] | any> {
        try {
            const { id } = this._args as DtoItemFind;
            const Items = await ItemModel.findById(id);
            const response = Items;
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
    private async _getAll(): Promise<ItemResult[] | any> {
        const { category, brand, page, size, sort } = this._args as DtoFindAll;

        let options

        if (sort === 'desc') {
            options = {
                sort: { names: -1 },
                page: page,
                limit: size,
            };
        } else {
            options = {
                sort: { names: 1 },
                page: page,
                limit: size,
            };
        }

        switch (true) {
            case (category.length > 0 && brand.length > 0):
                const ItemsFilter1 = await ItemModel.paginate({ category: category, brand: brand }, options);
                try {
                    const response = ItemsFilter1;
                    return response;
                } catch (error) {
                    return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
                }
                break;
            case (category.length > 0 && brand.length === 0):
                const ItemsFilter2 = await ItemModel.paginate({ category: category }, options);
                try {
                    const response = ItemsFilter2;
                    return response;
                } catch (error) {
                    return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
                }
                break
            case (category.length === 0 && brand.length > 0):
                const ItemsFilter3 = await ItemModel.paginate({ brand: brand }, options);
                try {
                    const response = ItemsFilter3;
                    return response;
                } catch (error) {
                    return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
                }
            default:
                const ItemsFilter4 = await ItemModel.paginate({}, options);
                try {
                    const response = ItemsFilter4;
                    return response;
                } catch (error) {
                    return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
                }
                break;
        }
    }


    private async _newItem(): Promise<ItemResult[] | any> {
        try {
            const {
                names,
                category,
                description,
                details1,
                details2,
                brand,
                images,
                dataSheet,
            } = this._args as DtoItemNew;

            const Items = new ItemModel({
                names: names,
                category: category,
                description: description,
                images: images,
                details1: details1,
                details2: details2,
                brand: brand,
                dataSheet: dataSheet,
                deleted: false,
                stock: true
            });
            await Items.save();
            return Items;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
}
export { ItemService };
