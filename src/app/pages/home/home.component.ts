import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isManager : boolean = false;
  constructor(private loginService:LoginService, private route:Router){
    // This will eventually have to be replaced with JWT
    if (this.loginService.id == 0) {
      this.route.navigate(['/login'])
    }
    if (this.loginService.isManager == 1) this.isManager = true;
  }

  showID() {
    console.log(this.loginService.id)
  }
  ngOnInit() {
  }

}
