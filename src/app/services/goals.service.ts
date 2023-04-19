import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../models/Goal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http:HttpClient) { }
  
  getEmployeeGoals(id:number) : Observable<Goal[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://localhost:9000/goals/employee/"+id+"/0",
        {headers: header})
  }
  addGoal(goal : Goal, id:number) : Observable<string> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://localhost:9000/goals/employees/"+id, 
        goal, {responseType:"text"})
  }
}
