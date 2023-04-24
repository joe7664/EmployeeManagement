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
  endDate:Date = new Date();
  meeting:Meeting={
    subject:"",
    startTime:"",
    endTime:"",
    description:""
  };
  constructor(private loginService:LoginService, private meetingService:MeetingService){}
  ngOnInit() :void{
    this.meeting.startTime=this.date.toISOString().substring(0, 10);
    console.log("full start date: ", this.meeting.startTime);
  }
  onChange(changes:any){
    console.log("selection changes: ", changes);
      this.endDate=new Date(this.date);
      this.meeting.endTime=this.endDate.toISOString().substring(0, 10);
  }
  submit(){
    console.log(this.meeting)
    this.meetingService.requestMeeting(this.meeting, this.loginService.id).subscribe(json => console.log(json));
  }
}
