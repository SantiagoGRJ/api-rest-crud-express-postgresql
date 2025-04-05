import { z } from "zod";


const isValidFieldsUser = z.object({
    email:z.string({ required_error:"Email is required ", invalid_type_error:"Email must be string"}).email({message:"Invalid Email"}),
    password:z.string({ required_error:"Password is required", invalid_type_error:"Password must be string"}).min(8,{message:"Value must greater than or equal 8 characters"})
})

export default isValidFieldsUser