import { DataTypes, Model, ModelCtor, Optional, Sequelize } from "sequelize";

interface UserAttributes {
    id: string
    names?: string
    lastname?: string
    email?: string
    password?: string
    deleted: number
    createdAt: Date
    updatedAt: Date
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>
interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {

}
const userFactory = (sequelize: Sequelize): ModelCtor<UserInstance> => sequelize.define<UserInstance>(
    'Users', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    names: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    deleted: {
        type: DataTypes.TINYINT
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'Users'
}
)

export { UserCreationAttributes, UserInstance, userFactory }