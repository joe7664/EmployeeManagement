import { Employee } from "./Employee";

export interface Admin{
    adminId?: number,
    username?: string,
    password?: string,
    isAdmin?: number,
    employee?: Employee[]

}