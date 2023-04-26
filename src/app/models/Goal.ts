import { Review } from "./Review"

export interface Goal {
    id ?: number,
    employee?:string,
    name?:string,
    description?:string,
    deadline ?:Date,
    weightage ?: number,
    comments ?: string,
    tempComment ?: string,
    fellowEmpComments?:string,
    status ?: string,
    personal ?: number
    employeeId?:string,
    performanceReviews?:Review
}