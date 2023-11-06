import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private connectionSvc: ConnectionService
  ) { }

  getData(): Promise<any> {
  return  this.connectionSvc.send('get', `packageTypes/list`);
  }

}
