import db from "../db";

class RoleService {

    async getAllRoles(){
        try {
            return await db.query('SELECT * FROM roles')
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(`Database Error: ${error.message}`)
            }else{
                throw new Error(`Unexpeted Error: ${error}`)

            }
        }
    }
}
export const roleService = new RoleService()