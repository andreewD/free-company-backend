import httpErrors from "http-errors";
import { ItemModel } from "database";
import { errorHandling } from "./utils";
import { GE } from "utils";

type Process = {
    type:
    | "getOne"
    | "getAll"
    | "newItem"
    | "deleteItem"
    | "updateItem"
    | "getByBrand"
    | "getByCategory";
};

type ItemRequest =
    | DtoItemFind
    | DtoItemNew
    | null
    | DtoFindByBrand
    | DtoFindByCategory;
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
            case "getByBrand":
                return await this._getByBrand();
            case "getByCategory":
                return await this._getByCategory();
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
        try {
            const Items = await ItemModel.find({});
            const response = Items;
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
    private async _getByBrand(): Promise<ItemResult[] | any> {
        try {
            const { brand } = this._args as DtoFindByBrand;
            const Items = await ItemModel.find({ brand: brand });
            const response = Items;
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }

    private async _getByCategory(): Promise<ItemResult[] | any> {
        try {
            const { category } = this._args as DtoFindByCategory;
            const Items = await ItemModel.find({ category: category });
            const response = Items;
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
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
            });
            await Items.save();
            return Items;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
}
export { ItemService };
