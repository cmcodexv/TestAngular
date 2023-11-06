import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { PackagesComponent } from "./packages.component";
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Packages",
      urls: [{ title: "Packages", url: "/packages" }, { title: "Packages" }],
    },
    component: PackagesComponent
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PackagesComponent
  ]
})
export class PackagesModule {}
