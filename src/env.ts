import { z } from "zod"
import { config } from "dotenv"

if (process.env.NODE_ENV !== 'production') {
    config()
    console.log("execute DotEnv");

}

const envSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.string().default('production'),
    SECRET_KEY:z.string({ required_error:'Secret Key is required' }),
    POSTGRESS_HOST: z.string().default('127.0.0.1'),
    POSTGRES_USERNAME : z.string({ required_error:'Postgres Username is required' }),
    POSTGRES_PASSWORD :z.string({ required_error:'Postgres Password is required' }),
    POSTGRESS_PORT : z.string({ required_error:'Postgres Port is required' }),
    POSTGRESS_DATABASE : z.string().default('store_rest')
})

 const result = envSchema.safeParse(process.env)

 if(!result.success){
    
     throw new Error(`Check Database enviroment Variables ${JSON.stringify(result.error.format(),null,2)}`)
    
}

export const EnvConfig = result.data