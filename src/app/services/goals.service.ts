import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../models/Goal';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(private http:HttpClient, private emp:LoginService) { }
  
  getEmployeeGoals() : Observable<Goal[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://54.215.229.217:9000/goals/employee/"+this.emp.id+"/0",
        {headers: header})
  }
  getManagerGoals() : Observable<Goal[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://54.215.229.217:9000/goals/employee/"+this.emp.id+"/1",
        {headers: header})
  }
  getGoalsByManagerId(id:number) : Observable<Goal[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://54.215.229.217:9000/goals/manager/"+id,
        {headers: header})
  }
  acceptGoal(goalId:number){
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/goals/"+goalId+"/accept", 
        "", {responseType:"text"})
  }
  negotiateGoal(comments:String, goalId:number){
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.put("http://54.215.229.217:9000/goals/"+goalId+"/negotiate", 
        comments, {responseType:"text"})
  }
  addGoal(goal : Goal, id:number) : Observable<string> {
    goal.fellowEmpComments="";
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/goals/employees/"+id, 
        goal, {responseType:"text"})
  }
  completeGoal(id:number){
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/goals/"+id+"/complete", 
        "", {responseType:"text"})
  }
  addComment(goalId:number, comment:string) : Observable<String>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.patch("http://54.215.229.217:9000/goals/"+goalId+"/comment", 
        comment, {responseType:"text"})
  }
}
