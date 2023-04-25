import { Component, Input } from '@angular/core';
import { Meeting } from 'src/app/models/Meeting';
import { MeetingMan } from 'src/app/models/MeetingMan';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-manager-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingManagerComponent {
  @Input() meetings:MeetingMan[]=[]
  displayColumns = ['id', 'day', 'subject', 'startTime','endTime', 'description']
  constructor(private managerServivice:ManagerServiceService) {
    // managerServivice.getMeetings().subscribe(data => {
    //   this.meetings = data;
    //   console.log("MEETINGS", data)
    // })
  }

  convertTime(time:string) {
    let temp = new Date()
    temp.setUTCHours(time.split(":")[0] as unknown as number)
    temp.setUTCMinutes(time.split(":")[1] as unknown as number)
    return temp;
  }

}
