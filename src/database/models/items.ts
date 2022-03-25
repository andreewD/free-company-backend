import { DataTypes, Model, ModelCtor, Optional, Sequelize } from "sequelize";

interface ItemAttributes {
    id: string
    names?: string
    category?: number
    description?: string
    images: Array<string>
    dataSheet: string
    deleted: number
    createdAt: Date
    updatedAt: Date

}

type ItemCreationAttributes = Optional<ItemAttributes, 'id'>
interface ItemInstance
    extends Model<ItemAttributes, ItemCreationAttributes>,
    ItemAttributes {

}
const itemFactory = (sequelize: Sequelize): ModelCtor<ItemInstance> => sequelize.define<ItemInstance>(
    'Items', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    names: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.NUMBER
    },
    description: {
        type: DataTypes.STRING
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    dataSheet: {
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
    tableName: 'Items'
}
)

export { ItemCreationAttributes, ItemInstance, itemFactory }