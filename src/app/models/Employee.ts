import { Goal } from "./Goal";
import { Leave } from "./Leave";
import { Meeting } from "./Meeting";

export interface Employee {
    email?:string,
    firstName?:string,
    id?:number,
    lastName?:string,
    isManager?:number,
    managerId?:number,
    password?:string,
    phoneNumber?:string,
    leaveBalance?:number,
    performanceReviews?:string[],
    selected?:boolean,
    goal?:Goal[],
    leaves?:Leave[],
    meetings?:Meeting[],

}