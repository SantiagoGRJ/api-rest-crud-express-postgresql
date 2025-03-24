import pgPromise from "pg-promise";
import { EnvConfig } from "./env";
import {  IConnectionParameters } from "pg-promise/typescript/pg-subset";

class DB {
    private static instance: DB | null = null;
    private db: any;
    private pgp:any;
    
    constructor(){
        this.pgp= pgPromise({
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
        this.db=this.pgp(cn)
    }
    public static getInstance() : DB {
        if(!DB.instance){
            DB.instance = new DB()
        }
        return DB.instance;
    }
    public getDb(){
        return this.db;
    }
    public closeConnection(){
        this.pgp.end()
    }
    

}

export default DB.getInstance().getDb();

