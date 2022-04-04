import httpErrors from "http-errors";
import { BrandsModel } from "database";
import { errorHandling } from "./utils";
import { GE } from "utils";

type Process = {
    type: "getOne" | "getAll" | "newBrands" | "deleteBrands" | "updateBrands";
};

type BrandsRequest = DtoBrandsFind | DtoBrandsNew | null;
type BrandsResponse = BrandsResult;

class BrandsService {
    private _args: BrandsRequest;

    constructor(args: BrandsRequest = null) {
        this._args = args;
    }

    public async process({ type }: Process): Promise<BrandsResponse> {
        switch (type) {
            case "getAll":
                return await this._getAll();
            case "getOne":
                return await this._getOne();
            case "newBrands":
                return await this._newBrands();
            default:
                throw new httpErrors.InternalServerError();
        }
    }

    private async _getOne(): Promise<BrandsResult[] | any> {
        try {
            const { id } = this._args as DtoBrandsFind;
            const Brandss = await BrandsModel.findById(id);

            const response = Brandss?.toJSON();
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
    private async _getAll(): Promise<BrandsResult[] | any> {
        try {
            const Brandss = await BrandsModel.find({});
            const response: BrandsResult[] = Brandss.map((Brands) => ({
                id: Brands?.id,
                name: Brands?.name || "",
            }));
            return response;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
    private async _newBrands(): Promise<BrandsResult[] | any> {
        try {
            const { name } = this._args as DtoBrandsNew;

            const Brandss = new BrandsModel({
                name: name,
            });
            await Brandss.save();
            return Brandss;
        } catch (error) {
            return errorHandling(error, GE.INTERNAL_SERVER_ERROR);
        }
    }
}
export { BrandsService };
