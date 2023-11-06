import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService,
  ) { }

  async canActivate(): Promise<boolean> {
    if (await this.authSvc.validaToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
