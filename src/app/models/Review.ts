import { Employee } from "./Employee";
import { Goal } from "./Goal";

export interface Review {
    reviewNumber?:number,
    deliverables?:String,
    achievements?:String,
    areaOfImprovement?:String,
    managerFeedback?:string,
    score?:number,
    goalId?:number,
    name?:string,
}