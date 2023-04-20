import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public loginService:LoginService, private router:Router){
  }
  isLoggedIn:number = 0;
  isManager:number = 0;
  logout() {
    localStorage.setItem("employeeID", "0")
    localStorage.setItem("isManager", "0")
    this.loginService.id = 0
    this.loginService.isManager = 0;
    this.router.navigate(["/login"])
  }
  ngOnInit() {
    this.isLoggedIn = this.loginService.id
    this.isManager = this.loginService.isManager;
  }
  // isLoggedIn() {
    // return this.loginService.id !== 0
  // }
}
