


export type TProduct = {
    id?: string
    name : string,
    description : string,
    url_img ?: string
    price: number,
    stock : number
    category : string
    created_at ?: string
}

export interface ICategory  {
    id ?: string
    name : string
    description : string
    created_at ?: string
}
export interface IUser {
    id?:string
    name:string
    email:string
    password:string
}
