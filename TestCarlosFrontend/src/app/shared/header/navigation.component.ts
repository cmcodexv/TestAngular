import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../@core/services/auth.services';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;
  public identity: any = {};

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    let data = localStorage.getItem('identity') || '{}';
    this.identity = JSON.parse(data);
  }

  logout() {
    this.authSvc.logout();
  }

}
