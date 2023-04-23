import { Component } from '@angular/core';
import { Leave } from 'src/app/models/Leave';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent {
  leaves:Leave[] = []
  leaveColumns = ['name', 'startDate', 'endDate', 'status', 'notes','feedback', 'action']
  constructor(private adminService: AdminService) {
    
  }

}
