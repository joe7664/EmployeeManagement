import { Component } from '@angular/core';
import { Goal } from 'src/app/models/Goal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsAdminComponent {
  displayColumns = ['id', 'name', 'description', 'deadline', 'status', 'weightage', 'comment']
  goals:Goal[] = []
  constructor(private adminService:AdminService) {
    this.adminService.getGoals().subscribe(data => {
      this.goals = data;
      console.log(data);
    })
  }
}
