export interface IProject {
    _id?: string
    user?: User
    title?: string
    thumbnail?: string
    description?: string
    clientLiveLink?: string
    serverLiveLink?: string
    clientCodeLink?: string
    serverCodeLink?: string
    technologyUsed?: string[]
    createdAt?: string
    updatedAt?: string
}

export interface User {
    _id: string
    name: string
    photo: string
}
