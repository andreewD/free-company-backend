
import { sequelizeConnection } from "libs";
import { userFactory } from "./models";



export const User = userFactory(sequelizeConnection)





export * from './models'