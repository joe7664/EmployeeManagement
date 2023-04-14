import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private loginService:LoginService, private router:Router){}
  logout() {
    localStorage.setItem("employeeID", "null")
    this.loginService.id = 0
    this.router.navigate(["/login"])
  }
}
