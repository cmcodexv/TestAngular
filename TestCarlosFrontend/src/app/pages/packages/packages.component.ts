import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
import { AlertService } from '../../@core/utils/alert.service';
import { PackageService } from '../../@core/services/package.services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'packages',
  templateUrl: 'packages.component.html'
})

export class PackagesComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = environment.dtOptions;
  dtTrigger: Subject<any> = new Subject<any>();


  public data: any[] = [];
  constructor(
    private pkgSvc: PackageService,
    private alertSvc: AlertService
    ) {}

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
   let resp = await this.pkgSvc.getData();
    if (resp !== undefined) {
      let { code, res } = resp;
      if (code === 200) {
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
