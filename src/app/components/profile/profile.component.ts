import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
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
    phoneNumber: ''
  };
  constructor(private profile : ProfileService){}
  ngOnInit(): void{
    this.profile.retrieveInfo().subscribe(json => this.employee = json);
  }
}
