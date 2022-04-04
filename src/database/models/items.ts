import { model, Schema } from "mongoose";
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

const ItemModel = model<ItemAttributes>("Items", Item);

export { ItemModel };
