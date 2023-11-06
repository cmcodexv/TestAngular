import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastrSvc: ToastrService
  ) { }
  
  showAlert(type: number, title: string, message: string) {
    switch (type) {
      case 1: this.toastrSvc.success(message, title); break;
      case 2: this.toastrSvc.warning(message, title); break;
      case 3: this.toastrSvc.info(message, title); break;
      default:
        this.toastrSvc.error(message, title);
        break;
    }
  }
}
