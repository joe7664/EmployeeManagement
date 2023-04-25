import { Employee } from "./Employee";

export interface Admin{
    username?: string,
    password?: string,
    isAdmin?: number,
    employee?: Employee[]

}