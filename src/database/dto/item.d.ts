interface DtoItemFind {
    id: string
    // names: string
    // lastname: string
    // email: string
    // password: string
}

// Interface for new Items
interface DtoItemNew {
    names?: string
    category?: number
    description?: string
    details1?: string
    details2?: string
    brand?: string
    images?: Array<string>
    dataSheet?: string
}
// interface DtoFindByBrand {
//     brand: String
// }
// interface DtoFindByCategory {
//      brand: String
// }

interface DtoFindAll {
    brand: Array<string>
    category: Array<string>
    page: number
    size: number
    sort: string
}

// Interface for returning Item's data
interface ItemResult {
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