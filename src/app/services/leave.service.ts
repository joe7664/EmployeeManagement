import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Leave } from '../models/Leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  id:number = 0

  constructor(private http:HttpClient) { }
  leaveRequest(leave:Leave) : Observable<Leave> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Leave>("http://localhost:9000/leaves/request/"+leave, 
        leave, {headers:header})
  }
  viewLeaves(leave:Leave) : Observable<Leave> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Leave>("http://localhost:9000/leaves/retrievePrevious",
        leave, {headers:header})
  }
}