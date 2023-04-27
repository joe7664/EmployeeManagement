import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../models/Leave';
import { Holiday } from '../models/Holiday';
import { LoginService } from './login.service';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  id:number = 0

  constructor(private http:HttpClient, private emp:LoginService) { }
  leaveRequest(leave:Leave) : Observable<String> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/leaves/request/"+this.emp.id, 
        leave, {responseType:"text"})
  }
  viewLeaves() : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://54.215.229.217:9000/leaves/"+this.emp.id, {headers:header})
  }
  viewLeavesById(employee:Employee) : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://54.215.229.217:9000/leaves/"+employee.id, {headers:header})
  }
  rejectLeave(id:number, feedback:string) : Observable<string> {
    const header = new HttpHeaders();
    header.append("accept", "text/plain");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/leaves/cancel/"+id,feedback,
    {headers:header, responseType:'text'})
  } 
  acceptLeave(id:number) : Observable<string> {
    const header = new HttpHeaders();
    header.append("accept", "text/plain");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://54.215.229.217:9000/leaves/approve/"+id,{notes:"asd"},
    {headers:header, responseType:"text"})
  } 
  holidayLeaves() : Observable<Holiday[]>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Holiday[]>("http://54.215.229.217:9000/holidays", {headers:header})
  }
}