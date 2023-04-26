import { Employee } from "./Employee";

export interface Admin{
    adminId?: number,
    username?: string,
    password?: string,
    id?:number
    isAdmin?: number,
    employee?: Employee[]

}