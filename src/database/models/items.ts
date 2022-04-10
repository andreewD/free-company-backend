import { model, PaginateModel, Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2';
interface ItemAttributes {
    id: String;
    names?: String;
    category?: String;
    description?: String;
    details1: String;
    details2?: String;
    brand: String;
    images: Array<String>;
    dataSheet: String;
    deleted: Boolean;
    stock: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

const Item = new Schema<ItemAttributes>(
    {
        names: {
            type: String,
        },
        category: {
            type: String,
        },
        description: {
            type: String,
        },
        details1: {
            type: String,
        },
        details2: {
            type: String,
        },
        brand: {
            type: String,
        },
        images: {
            type: [{ type: String }],
        },
        dataSheet: {
            type: String,
        },
        deleted: {
            type: Boolean,
        },
        stock: {
            type: Boolean
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
        versionKey: false,
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id.toString();
                ret.updatedAt = ret.updatedAt.toISOString();
                delete ret._id;
                delete ret.__v;
            },
            virtuals: true,
        },
    }
);
Item.plugin(paginate)
const ItemModel = model<ItemAttributes, PaginateModel<ItemAttributes>>("Items", Item);

export { ItemModel };
