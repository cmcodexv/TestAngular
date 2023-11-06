import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Users",
      urls: [{ title: "Users", url: "/users" }, { title: "Users" }],
    },
    component: UsersComponent
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersComponent
  ]
})
export class UsersModule { }
