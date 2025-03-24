import db from "../db"
import { IUser } from "../models/user.model"

class AuthService {

    async Login(email:string) {
        try {
           return await db.oneOrNone('SELECT id,name,email,password,id_role FROM users WHERE email=$1',[email])
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(`Database Error: ${error.message}`)
            }else{
                throw new Error(`Unexpected Error: ${error}`)
            }
        }
    }

    async Register(user:IUser,id_role: { id:string}){
       return await db.none("INSERT INTO users (name,email,password,id_role) VALUES ($1,$2,$3,$4)", [user.name, user.email, user.password, id_role.id])
    }
    
}

const authService = new AuthService()

 export default authService