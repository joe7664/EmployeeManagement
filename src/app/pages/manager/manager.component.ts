import { Component } from '@angular/core';
import { Router  } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  constructor(private loginService:LoginService, private route:Router) {
    if (this.loginService.id == 0) {
      this.route.navigate(['/login'])
    }
  }

}
