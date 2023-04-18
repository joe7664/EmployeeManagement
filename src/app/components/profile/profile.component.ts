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
    id: this.emp.id
  };
  update: Employee = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    id:this.emp.id
  };
  constructor(private profile : ProfileService, private emp : LoginService){ }
  ngOnInit(): void{
    this.profile.retrieveInfo(this.emp.id).subscribe(json => this.employee = json);
  }
  updateInfo(){
    if(this.update.email == '') this.update.email=this.employee.email;
    if(this.update.firstName == '') this.update.firstName=this.employee.firstName;
    if(this.update.lastName == '') this.update.lastName=this.employee.lastName;
    if(this.update.password == '') this.update.password=this.employee.password;
    if(this.update.phoneNumber == '') this.update.phoneNumber=this.employee.phoneNumber;
    this.profile.updateInfo(this.update).subscribe(json => this.employee = json);
    this.refresh();
  }
  refresh(){
    this.update.email = '';
    this.update.firstName = '';
    this.update.lastName = '';
    this.update.password = '';
    this.update.phoneNumber = '';
    this.edit=false;
  }
}
