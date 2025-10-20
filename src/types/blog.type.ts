
interface IAuthor {
    _id?: string,
    name?: string,
    email?: string,
    phone?: string,
    photo?: string
}


export interface IBlog {
    _id?: string,
    title?: string,
    author?: IAuthor,
    description?: string,
    thumbnail?: string,
    tags?: string[],
    views?: number,
    isFeatured?: boolean,
    createdAt?: string
    updatedAt?: string
}