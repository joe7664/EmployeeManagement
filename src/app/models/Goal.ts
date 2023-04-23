import { Review } from "./Review"

export interface Goal {
    id ?: number,
    employee?:string,
    name?:string,
    description?:string,
    deadline ?:Date,
    weightage ?: number,
    comments ?: string,
    status ?: string,
    personal ?: number
    employeeId?:string,
    performanceReviews?:Review[]
}