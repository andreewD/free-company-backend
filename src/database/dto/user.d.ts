interface DtoUserFind {
    id: string
    // names: string
    // lastname: string
    // email: string
    // password: string
}

// Interface for new Users
interface DtoUserNew {
    names: string
    lastname: string
    email: string
    password: string
}

// Interface for returning User's data
interface UserResult {
    id: string
    names: string
    lastname: string
    email: string
    deleted: number
    createdAt: Date
    updatetAt: Date
}