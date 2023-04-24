import { Time } from '@angular/common';
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
  sTime:Time = {hours:0, minutes:0};
  eTime:Time = this.sTime;
  min:string="09:00";
  max:string="06:00";
  meeting:Meeting={
    subject:"",
    startDate:"",
    startTime:this.sTime,
    endTime:this.eTime,
    description:"",
    employeeId:this.loginService.id
  };
  constructor(private loginService:LoginService, private meetingService:MeetingService){}
  ngOnInit() :void{
    this.meeting.startDate=this.date.toISOString().substring(0, 10);
    console.log("full start date: ", this.meeting.startTime);
  }
  onChange(changes:any){
    this.eTime.hours=this.meeting.startTime.hours+1;
    this.eTime.minutes=this.meeting.startTime.minutes;
    this.meeting.endTime=this.eTime;
  }
  submit(){
    console.log(this.meeting)
    this.meetingService.requestMeeting(this.meeting, this.loginService.id).subscribe(json => console.log(json));
  }
}
