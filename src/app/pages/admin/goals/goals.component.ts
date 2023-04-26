import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Goal } from 'src/app/models/Goal';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GoalsAdminComponent {
  displayColumns = ['id', 'name', 'description', 'deadline', 'status', 'weightage', 'comment']
  expandedElement : Goal;
  @Input() goals:Goal[] = []
  @Input() employee:Employee = {};
  constructor(private adminService:AdminService, private cd:ChangeDetectorRef) {
    this.expandedElement = {}
  }
  toggleRow(element: Goal) {
    this.expandedElement = element
    this.cd.detectChanges();
   }
   log(element:any) {
    console.log(element)
   }
}
