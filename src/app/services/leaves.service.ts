import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Leave } from '../models/Leave';
import { Holiday } from '../models/Holiday';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  id:number = 0

  constructor(private http:HttpClient) { }
  leaveRequest(leave:Leave, id:number) : Observable<String> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://localhost:9000/leaves/request/"+id, 
        leave, {responseType:"text"})
  }
  viewLeaves(id:number) : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://localhost:9000/leaves/"+id, {headers:header})
  }
  rejectLeave(id:number) : Observable<string> {
    const header = new HttpHeaders();
    header.append("accept", "text/plain");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://localhost:9000/leaves/cancel/"+id,"This is a message",
    {headers:header, responseType:'text'})
  } 
  acceptLeave(id:number) : Observable<string> {
    const header = new HttpHeaders();
    header.append("accept", "text/plain");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post("http://localhost:9000/leaves/approve/"+id,{notes:"asd"},
    {headers:header, responseType:"text"})
  } 
  holidayLeaves() : Observable<Holiday[]>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Holiday[]>("http://localhost:9000/holidays", {headers:header})
  }
}