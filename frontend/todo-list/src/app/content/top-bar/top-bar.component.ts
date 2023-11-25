import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async onLogout() {
    var result = await this.authService.logout();
    if (result) {
      this.router.navigate(['login']);
    }
  }
}
