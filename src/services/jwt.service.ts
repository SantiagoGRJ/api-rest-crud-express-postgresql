import jwt from "jsonwebtoken";
import { EnvConfig } from "../env";
import { IUser } from "../lib/definitions";


const SECRET_KEY = EnvConfig.SECRET_KEY

export const generateToken = (user: IUser) => {
    return jwt.sign({ username: user.name }, SECRET_KEY, { expiresIn: '1h' })
}
export const isValidToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return { success: true, data: decoded }
    } catch (e: any) {
        return { success: false, error: e.message }
    }
}