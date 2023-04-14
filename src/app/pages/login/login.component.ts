import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type:string = "admin";
  username:string="";
  password:string="";
  constructor(private loginService:LoginService, private router:Router){}
  toggleType() {
    this.type = this.type=="admin" ? "employee" : "admin";
  }
  submit() {
    if (this.type=="employee") {
      this.loginService.login({"email":this.username, "password":this.password}).subscribe(data => {
        console.log(data)
        this.loginService.id = data.id as unknown as number;
        this.router.navigate(['/home']);
      })
    } else if (this.type=="admin") {
      console.log("We have not implemented an Admin Login feature yet")
    } else {
      console.log("How did you get here???")
    }
  }



}
