import { model, Schema } from "mongoose";

interface CategoriesAttributes {
    id: String;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

const Brands = new Schema<CategoriesAttributes>(
    {
        name: {
            required: true,
            unique: true,
            type: String,
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

const BrandsModel = model<CategoriesAttributes>("brands", Brands);

export { BrandsModel };
