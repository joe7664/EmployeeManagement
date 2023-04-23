import { Component, Input } from '@angular/core';
import { Meeting } from 'src/app/models/Meeting';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-manager-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingManagerComponent {
  meetings:Meeting[]=[]
  displayColumns = ['id', 'subject', 'startTime','endTime', 'description']
  constructor(private managerServivice:ManagerServiceService) {
    managerServivice.getMeetings().subscribe(data => {
      this.meetings = data;
      console.log("MEETINGS", data)
    })
  }

}
