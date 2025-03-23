import pgPromise from "pg-promise";
import { EnvConfig } from "./env";
import {  IConnectionParameters } from "pg-promise/typescript/pg-subset";

const pgp = pgPromise({
    connect(e) {
        const cp = e.client.connectionParameters;
        console.log('Connected to database:', cp.database);
    },
    
})


const cn : IConnectionParameters = {
    host:String(EnvConfig.POSTGRESS_HOST) ,
    port:Number(EnvConfig.POSTGRESS_PORT),
    database:String(EnvConfig.POSTGRESS_DATABASE),
    user:String(EnvConfig.POSTGRES_USERNAME),
    password:String(EnvConfig.POSTGRES_PASSWORD),
    max: 5
}
const db = pgp(cn)



export default db;