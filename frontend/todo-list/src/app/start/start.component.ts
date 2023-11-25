import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  startFlag: boolean = false;
  authenticatedFlag: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  async ngAfterViewInit() {
    this.startFlag = await this.authService.start();
    this.authenticatedFlag = await this.authService.checkSession();
  }
}
