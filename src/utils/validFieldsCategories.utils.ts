import { z } from "zod";



const isValidFieldsCategories   = z.object({
    id: z.string().uuid().optional(),
    name: z.string({ required_error:"Name is required", invalid_type_error:"Name must be string" }),
    description: z.string({ required_error:"Description is required", invalid_type_error:"Description must be string" }),
    created_at: z.string().optional()

})


export default isValidFieldsCategories