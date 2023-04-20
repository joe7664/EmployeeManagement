import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type:string = "employee";
  username:string="";
  password:string="";
  email:string="";
  fName:string="";
  lName:string = "";
  phone:string="";
  managerId:string="";
  regPassword:string="";
  message:string="";
  loginMessage:string="";
  showReset:boolean = false;
  emailForgot:string = "";

  constructor(private loginService:LoginService, private router:Router){}
  toggleType() {
    this.type = this.type=="admin" ? "employee" : "admin";
  }
  submit() {
    if (this.type=="employee") {
      this.loginService.login({"email":this.username, "password":this.password})
      .subscribe(
        data => {
        console.log(data)
        this.loginService.id = data.id as unknown as number;
        this.loginService.isManager = data.isManager as unknown as number;
        localStorage.setItem("employeeID", data.id as unknown as string)
        localStorage.setItem("isManager", data.isManager==1 ? "1" : "0")
        this.router.navigate(['/home']);
      }, error => {
        this.loginMessage = error.error
      })
    } else if (this.type=="admin") {
      console.log("We have not implemented an Admin Login feature yet")
    } else {
      console.log("How did you get here???")
    }
  }
  reset() {
    this.showReset = !this.showReset
  }
  resetPassword() {
    this.loginService.resetPassword(this.emailForgot).subscribe(data => {
      console.log(data)
    });
  }
  register() {
    this.loginService.register({
      email:this.email, 
      password:this.regPassword, 
      firstName:this.fName, 
      lastName:this.lName, 
      phoneNumber:this.phone, 
      managerId:this.managerId as unknown as number,
      isManager:0,
      }).subscribe(
        (data) => {
        this.message = "Employee created Succesfully"
      }, (error) => {
        console.log(error)
        this.message= error.error
      })
  }
}
