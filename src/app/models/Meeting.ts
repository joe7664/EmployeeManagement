import { Time } from "@angular/common";

export interface Meeting {
    subject:string,
    startDate:string,
    startTime:Time,
    endTime?:Time,
    description?:string,
    employeeId:number,
}