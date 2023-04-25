import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { MeetingMan } from '../models/MeetingMan';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient, private emp:LoginService) { }
  
  requestMeeting(meeting:MeetingMan) : Observable<String> {
    const header = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*")
    meeting.startDate = meeting.startTime?.split("T")[0]
    meeting.startTime = meeting.startTime?.split("T")[1].split(".")[0]
    meeting.endTime = meeting.endTime?.split("T")[1].split(".")[0]
    return this.http.post("http://localhost:9000/meetings/employee/"+this.emp.id, meeting, {responseType:"text"})
  }
}
