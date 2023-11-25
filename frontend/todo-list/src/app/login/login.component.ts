import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  pUserForm!: FormGroup;
  doneFlag: boolean = true;
  failedFlag: boolean = false;

  ngOnInit(): void {
    this.pUserForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
    });
  }

  async onLogin(event: Event) {
    event.preventDefault();
    this.doneFlag = false;
    this.failedFlag = false;
    var isSuccess = await this.authService.pUserLogin(
      this.email?.value,
      this.password?.value
    );
    this.doneFlag = true;
    if (isSuccess) {
      this.router.navigate(['/content']);
    } else {
      this.failedFlag = true;
    }
  }

  get email() {
    return this.pUserForm.get('email');
  }

  get password() {
    return this.pUserForm.get('password');
  }

  getEmailErrorMsg() {
    if (this.pUserForm.get('email')?.hasError('required')) {
      return '入力してください。';
    }
    return '';
  }

  getPasswordErrorMsg() {
    if (this.pUserForm.get('password')?.hasError('required')) {
      return '入力してください。';
    }
    if (
      this.password?.errors?.['minlength'] ||
      this.password?.errors?.['maxlength']
    ) {
      return '8文字以上、25文字以下で入力してください。';
    }
    return '';
  }
}
