import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  template: `
    <app-full-layout>
      <router-outlet></router-outlet>
    </app-full-layout>
  `
})
export class PagesComponent {
}
