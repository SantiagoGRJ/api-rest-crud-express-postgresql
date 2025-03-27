import { z } from "zod";


const isValidFildsProducts = z.object({
    id: z.string().uuid({ message: "Invalid UUID" }).optional(),
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    url_img: z.string({ required_error: "url Image is required", invalid_type_error: "Url image must be String" }).optional(),
    price: z.number().nonnegative({ message: "Value must greater than or equal 0" }),
    stock: z.number().int({ message: "Value must be an Integer" }),
    category: z.string().uuid({ message: "Invalid UUID" }),
    created_at: z.string()
})



export default isValidFildsProducts