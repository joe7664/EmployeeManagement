import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/models/Notification';
import { ManagerServiceService } from 'src/app/services/manager-service.service';

@Component({
  selector: 'app-emp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class EmpNotifComponent {
  @Input() notifications:Notification[] = []
  constructor(private managerService:ManagerServiceService) {

  }
  deleteNot(id:number) {
    this.managerService.deleteNotification(id).subscribe(data => {
      let temp = this.notifications
      this.notifications = temp.filter(el => el.id !== id)
      console.log(data)
    })
  }
  log() {
    console.log(this.notifications)
  }
}
