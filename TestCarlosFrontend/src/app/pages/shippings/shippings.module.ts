import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AddShippingsComponent } from "./addShippings/addShippings.component";
import { ShippingsComponent } from "./shippings.component";
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Shippings",
      urls: [{ title: "Shippings", url: "/shippings" }, { title: "Shippings" }],
    },
    component: ShippingsComponent
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    AddShippingsComponent,
    ShippingsComponent
  ]
})
export class ShippingsModule {}
