
export interface IUser {
    _id: string
    name: string
    email: string
    role: string
    isActive: string
    isVerified: boolean
    phone?: string
    createdAt: string
    updatedAt: string
    photo?: string
}