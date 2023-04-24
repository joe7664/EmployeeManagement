import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { Goal } from '../models/Goal';
import { Leave } from '../models/Leave';
import { Review } from '../models/Review';
import { LoginService } from './login.service';
import { Meeting } from '../models/Meeting';
import { MeetingMan } from '../models/MeetingMan';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class ManagerServiceService {

  constructor(private http:HttpClient, private loginService:LoginService) { }
  getEmployees() : Observable<Employee[]>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Employee[]>("http://localhost:9000/revWorkforce/employee/manager/" + this.loginService.id , {headers:header})
  }
  getLeaveRequests() : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://localhost:9000/leaves/manager/" + this.loginService.id , {headers:header})
  }
  getEmployeeLeave(employeeID:number) : Observable<Leave[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Leave[]>("http://localhost:9000/leaves/"+employeeID, {headers:header})
  }
  findAvailableEmployees(leave:Leave) : Observable<Employee[]>{
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.post<Employee[]>("http://localhost:9000/leaves/employee-availability/manager/" + this.loginService.id,
    leave, {headers:header})
  }
  getEmployeeGoals() {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Goal[]>("http://localhost:9000/goals/manager/" + this.loginService.id,
    {headers:header})
  }
  getPerformanceReviews() {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Review[]>("http://localhost:9000/performance/manager/" + this.loginService.id,
    {headers:header})
  }
  getMeetings() : Observable<Meeting[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Meeting[]>("http://localhost:9000/meetings/manager/" + this.loginService.id,
    {headers:header})
  }
  postMeeting(meeting:MeetingMan) :Observable<string>{
    meeting.startDate = meeting.startTime?.split("T")[0]
    meeting.startTime = meeting.startTime?.split("T")[1].split(".")[0]
    meeting.endTime = meeting.endTime?.split("T")[1].split(".")[0]
    console.log(meeting)

    return this.http.post("http://localhost:9000/meetings/employee/"+this.loginService.id, meeting, {responseType:"text"})
  }
  getNotifications() : Observable<Notification[]> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    return this.http.get<Notification[]>("http://localhost:9000/notifications/manager/" + this.loginService.id, {headers:header})
  }
  deleteNotification(id:number) : Observable<string> {
    return this.http.delete("http://localhost:9000/notifications/"+id, {responseType:"text"})
  }
}
