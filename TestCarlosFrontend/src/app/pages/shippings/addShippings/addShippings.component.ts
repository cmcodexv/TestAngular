import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingService } from 'src/app/@core/services/shipping.services';
import { AlertService } from 'src/app/@core/utils/alert.service';

@Component({
  selector: 'app-add-shippings',
  templateUrl: './addShippings.component.html',
  styleUrls: ['./addShippings.component.scss']
})

export class AddShippingsComponent implements OnInit {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  shippingFom!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shpgSvc: ShippingService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {
    if (this.shippingFom == undefined)
      this.shippingFom = this.initForm();
  }

  async onSubmit() {
    let resp = await this.shpgSvc.add(this.shippingFom.value);
    if (resp !== undefined) {
      let { code, res } = resp;
      if (code == 200) {
        this.alertSvc.showAlert(1, '', res);
        this.close.emit(true);
      } else {
        this.alertSvc.showAlert(3, '', res);
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error saving data!');
    }

  }

  // Validate input
  validateInput(name: string) {
    return this.shippingFom.get(name)?.invalid && this.shippingFom.get(name)?.touched;
  }

  initForm(): FormGroup {
    return this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      zip_code: ['', [Validators.required]],
      remitent: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      addressee: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      weight: ['', [Validators.required]]
    });
  }

  onCloseModal() {
    this.shippingFom = this.initForm();
    this.close.emit(false);
  }

}
