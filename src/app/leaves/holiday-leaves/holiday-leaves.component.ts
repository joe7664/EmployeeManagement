import { Component } from '@angular/core';
import { Holiday } from 'src/app/models/Holiday';
import { LeaveService } from 'src/app/services/leaves.service';

@Component({
  selector: 'app-holiday-leaves',
  templateUrl: './holiday-leaves.component.html',
  styleUrls: ['./holiday-leaves.component.css']
})
export class HolidayLeavesComponent {
  holidays: Holiday[]=[];

  displayedColumns: string[] = ['ID', 'Dates', 'Days', 'Name', 'Type'];
  constructor(private leaveService:LeaveService){}

  ngOnInit():void{
    this.leaveService.holidayLeaves().subscribe(json => this.holidays = json);
  }
}
