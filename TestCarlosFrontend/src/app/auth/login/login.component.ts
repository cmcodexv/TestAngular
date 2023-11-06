import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/services/auth.services';
import { AlertService } from '../../@core/utils/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public inputPass: string = 'password';
  public iconClass: string = 'bi bi-eye';

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userSvc: AuthService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  // Validations forms (Touched and Dirty)
  validateInput(name: string) {
    return this.loginForm.get(name)?.invalid && this.loginForm.get(name)?.touched;
  }

  validateMinLength(name: string) {
    return this.loginForm.get(name)?.touched && this.loginForm.get(name)?.errors?.['minlength'];
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // Send form
  async onSubmit() {
    let resp = await this.userSvc.login(this.loginForm.value);
    if (resp.code === 200) {

      // set identity in localstorage
      this.alertSvc.showAlert(1, 'Login successfully', 'success');
      localStorage.setItem('identity', JSON.stringify(resp.identity));
      this.route.navigate(['/pages/dashboard']);

    } else if (resp.status === 400) {

      // bad credentials
      this.alertSvc.showAlert(4, 'Error', resp.error);
      return;

    } else {

      // error in server
      this.alertSvc.showAlert(4, 'Error', 'Error in server!');
      return;
    }

  }

  showPassword() {
    this.inputPass = (this.inputPass == 'password') ? 'text' : 'password';
    this.iconClass = (this.inputPass != 'password') ? 'bi bi-eye-slash' : 'bi bi-eye';
  }


}
