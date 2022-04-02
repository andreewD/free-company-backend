import { DataTypes, Model, ModelCtor, Optional, Sequelize } from "sequelize";

interface ItemAttributes {
    id: string
    productName: string
    names?: string
    category?: number
    description?: string
    details1: string
    details2: string
    brand: string
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
    productName: {
        type: DataTypes.STRING
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
    details1: {
        type: DataTypes.STRING
    },
    details2: {
        type: DataTypes.STRING
    },
    brand: {
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