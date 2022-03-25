import { DataTypes, Model, ModelCtor, Optional, Sequelize } from "sequelize";

interface CategoriesAttributes {
    id: number
    name?: string
    createdAt: Date
    updatedAt: Date

}

type CategoriesCreationAttributes = Optional<CategoriesAttributes, 'id'>
interface CategoriesInstance
    extends Model<CategoriesAttributes, CategoriesCreationAttributes>,
    CategoriesAttributes {

}
const categoriesFactory = (sequelize: Sequelize): ModelCtor<CategoriesInstance> => sequelize.define<CategoriesInstance>(
    'Categories', {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }, createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },

}, {
    tableName: 'Categories'
}
)

export { CategoriesCreationAttributes, CategoriesInstance, categoriesFactory }