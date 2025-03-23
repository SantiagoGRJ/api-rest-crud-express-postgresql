import bcrypt from "bcrypt"
const saltRound = 10


export const hashPassword = async (password:string) => {
   return await bcrypt.hash(password,saltRound)
}

export const comparePassword = async (password:string,encryptedPassword:string) => {
   return await bcrypt.compare(password,encryptedPassword)
}

