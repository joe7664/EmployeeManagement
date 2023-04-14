import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { LoginService } from 'src/app/services/login.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  edit: boolean = false;
  employee: Employee = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    id: 0
  };
  constructor(private profile : ProfileService, private emp : LoginService){ }
  ngOnInit(): void{
    this.profile.retrieveInfo(this.emp.id).subscribe(json => this.employee = json);
  }
  updateInfo(){
    this.profile.updateInfo(this.employee).subscribe(json => this.employee = json);
  }
}
