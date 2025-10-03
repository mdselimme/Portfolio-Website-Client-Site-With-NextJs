


export interface IBlog {
    _id: string,
    title: string,
    author: string,
    description: string,
    thumbnail?: string,
    tags: string[],
    views: number,
    isFeatured: boolean
}