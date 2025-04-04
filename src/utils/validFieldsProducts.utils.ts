import { z } from "zod";


const isValidFildsProducts = z.object({
    id: z.string({ required_error:"Id is required" , invalid_type_error:"Id must be string" }).uuid({ message: "Invalid UUID" }).optional(),
    name: z.string({ required_error: "Name is required" , invalid_type_error:"Name must be string" }),
    description: z.string({ required_error: "Description is required", invalid_type_error:"Description must be string" }),
    url_img: z.string({ required_error: "url Image is required", invalid_type_error: "Url image must be String" }).optional(),
    price: z.number({required_error:"Price is required", invalid_type_error:"Price must be Number" }).nonnegative({ message: "Value must greater than or equal 0" }),
    stock: z.number({ required_error:"Stock is required", invalid_type_error:"Stock must be Number" }).int({ message: "Value must be an Integer" }),
    category: z.string({ required_error:"Category is required", invalid_type_error:"Category must be string" }).uuid({ message: "Invalid UUID" }),
    created_at: z.string().optional()
})



export default isValidFildsProducts