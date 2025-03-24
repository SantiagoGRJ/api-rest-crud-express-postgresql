import { Request, Response } from "express";
import { roleService } from "../services/role.service";

class RoleController {
    
    async getAllCategories(_req: Request, res: Response) {
        try {
            const data = await roleService.getAllRoles()
            res.json(data)
            return
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(`Database Error: ${error.message}`)
            }else{
                throw new Error(`Unexpected Error: ${error}`)
            }
        }
    }
}

export const roleController = new RoleController()