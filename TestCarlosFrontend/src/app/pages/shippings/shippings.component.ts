import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlertService } from '../../@core/utils/alert.service';
import { ShippingService } from '../../@core/services/shipping.services';
import { environment } from '../../environments/environment';


declare var window: any;

@Component({
  selector: 'shippings',
  templateUrl: 'shippings.component.html'
})

export class ShippingsComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = environment.dtOptions;
  dtTrigger: Subject<any> = new Subject<any>();

  public modalAdd: any;
  public modalDelete: any;

  public data: any[] = [];
  public itemSelected: any = null;
  public idDelete: number = 0;

  constructor(
    private shpgSvc: ShippingService,
    private alertSvc: AlertService
  ) { }

  ngOnInit(): void {

    this.modalAdd = new window.bootstrap.Modal(
      document.getElementById("modalAddShipping")
    );

    this.modalDelete = new window.bootstrap.Modal(
      document.getElementById("modalDeleteShipping")
    );

    this.loadData();
  }

  async loadData() {
    let resp = await this.shpgSvc.getData();

    if (resp !== undefined) {
      let { code, res } = resp;

      if (code == 200 && res.length !== 0) {
        this.data = res;
      } else {
        this.alertSvc.showAlert(3, '', 'No data found!');
      }
    } else {
      this.alertSvc.showAlert(3, '', 'Error loading data!');
    }
    this.dtTrigger.next(this.dtOptions);
  }

  searchData(e: any) {
    let value = e.target.value;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(value).draw();
    });
  }

  showModalAdd() {
    this.modalAdd.show();
  }

  showModalDelete(item: any) {
    this.idDelete = item?.id;
    this.modalDelete.show();
  }

  async confirmAddRecord(e: any) {
    if (!e) {
      this.modalAdd.hide();
      return;
    }
    this.modalAdd.hide();
    this.renderer();
    this.loadData();
  }

  async confirmDeleteRecord(e: any) {
    if (!e) {
      this.idDelete = 0;
      this.modalDelete.hide();
      return;
    }

    let resp = await this.shpgSvc.delete(this.idDelete);

    if (resp !== undefined) {
      let { code } = resp;
      if (code === 200) {
        this.alertSvc.showAlert(1, '', 'Record deleted!');
        this.data = this.data.filter(d => d.id !== this.idDelete);
        this.modalDelete.hide();
        this.idDelete = 0;
        this.renderer();
        this.loadData();
      } else {
        this.alertSvc.showAlert(3, '', 'Error deleting record!');
      }
    }
  }

  renderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  // destroy table
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}