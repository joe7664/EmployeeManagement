import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Goal } from '../models/Goal';
import { Leave } from '../models/Leave';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  getEmployees() : Observable<Employee[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Employee[]>("http://54.215.229.217:9000/revWorkforce/employees",
        {headers: header})
  }
  patchEmployee(employee:Employee) {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.patch("http://54.215.229.217:9000/revWorkforce/employee/" + employee.id,employee,
        {headers: header})
  }  
  getGoals() : Observable<Goal[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://54.215.229.217:9000/goals",
        {headers: header})
  }
  getReviews() : Observable<Review[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Review[]>("http://54.215.229.217:9000/performance",
        {headers: header})
  }
  getLeaves() : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://54.215.229.217:9000/leaves",
        {headers: header})

  }
  getGoalsByEmployee(emp:Employee):Observable<Goal[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://54.215.229.217:9000/goals/" +emp.id,{headers: header})
  }
  updateLeave(leave:Leave) : Observable<Leave>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.patch("http://54.215.229.217:9000/leaves/" + leave.id,  leave, {headers:header})
  }
  deleteLeave(leave:Leave) {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.delete("http://54.215.229.217:9000/leaves/" + leave.id,  {headers:header})
  }
}
