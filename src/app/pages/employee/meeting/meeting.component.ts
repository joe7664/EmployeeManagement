import { Component } from '@angular/core';
import { MeetingMan } from 'src/app/models/MeetingMan';
import { LoginService } from 'src/app/services/login.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {
  date:Date;
  startTime:string="12:00";
  endTime:string="13:00";
  meeting:MeetingMan={
    subject:"",
    startDate:"",
    startTime:"",
    endTime:"",
    description:"",
    employeeId:this.loginService.id
  };
  constructor(private loginService:LoginService, private meetingService:MeetingService){
    this.date=new Date();
  }
  ngOnInit() :void{
    this.date = new Date();
    this.meeting.startDate=this.date.toISOString().substring(0, 10);
    console.log("full start date: ", this.meeting.startDate);
  }
  submit(){
    this.date.setMinutes(0)
    let start = new Date(this.date);
    let end = new Date(this.date)
    console.log(start.toISOString());
    start.setHours(this.startTime.split(":")[0] as unknown as number)
    start.setMinutes(this.startTime.split(":")[1] as unknown as number)
    end.setHours(this.endTime.split(":")[0] as unknown as number)
    end.setMinutes(this.endTime.split(":")[1] as unknown as number)
    this.meeting.startTime = start.toISOString();
    this.meeting.endTime = end.toISOString();
    console.log(this.meeting)
    this.meetingService.requestMeeting(this.meeting).subscribe(json => console.log(json));
  }
}
