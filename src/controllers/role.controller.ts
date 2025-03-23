import { Request, Response } from "express";
import db from "../db";


export const getAllRoles = async (_req:Request,res:Response) => {
    const data = await db.query('SELECT * FROM roles')
    res.json(data)
}