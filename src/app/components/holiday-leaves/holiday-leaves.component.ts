import { Component } from '@angular/core';
import { Holiday } from 'src/app/models/Holiday';
import { Leave } from 'src/app/models/Leave';
import { LeaveService } from 'src/app/services/leaves.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-holiday-leaves',
  templateUrl: './holiday-leaves.component.html',
  styleUrls: ['./holiday-leaves.component.css']
})
export class HolidayLeavesComponent {
  holidays: Holiday[]=[];

  constructor(private leaveService:LeaveService){}

  ngOnInit():void{
    this.leaveService.holidayLeaves().subscribe(json => this.holidays = json);
  }
}
