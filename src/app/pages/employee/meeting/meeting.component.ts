import { Component } from '@angular/core';
import { Meeting } from 'src/app/models/Meeting';
import { LoginService } from 'src/app/services/login.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {
  date:Date = new Date();
  endDate:Date = this.date;
  meeting:Meeting={
    subject:"",
    startTime:"",
    endTime:"",
    description:""
  };
  constructor(private loginService:LoginService, private meetingService:MeetingService){}
  ngOnInit(){
    this.date.setDate(this.date.getDate());
    this.meeting.startTime=this.date.toISOString().substring(0, 10);
  }
  onChange(changes:any){
      console.log("end date: ", this.endDate);
      this.meeting.endTime=this.endDate.toISOString().substring(0, 10);
  }
  submit(){
    this.meetingService.requestMeeting(this.meeting, this.loginService.id).subscribe(json => console.log(json));
  }
}
