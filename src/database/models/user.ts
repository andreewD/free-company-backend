import { model, Schema } from 'mongoose'

interface UserAttributes {
    id: String
    names?: String
    lastname?: String
    email?: String
    password?: String
    deleted: Boolean
    role: String
    profilePic: String
    createdAt: Date
    updatedAt: Date
}

const User = new Schema<UserAttributes>(
    {
        names: {
            required: true,
            type: String
        },
        lastname: {
            required: true,
            type: String
        },
        email: {
            required: true,
            unique: true,
            type: String
        },
        password: {
            required: true,
            select: false,
            type: String
        },
        role: {
            required: true,
            type: String
        },
        profilePic: {
            type: String
        },
        deleted: {
            required: true,
            type: Boolean
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        },
        versionKey: false,
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id.toString()
                ret.updatedAt = ret.updatedAt.toISOString()
                delete ret._id
                delete ret.__v
            },
            virtuals: true
        }
    }
)

const UserModel = model<UserAttributes>('users', User)

export { UserModel }






