import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(
    private connectionSvc: ConnectionService
  ) { }

  add(data: any): Promise<any> {
    return this.connectionSvc.send('post', `shipping/create`, data);
  }

  getData(): Promise<any> {
  return this.connectionSvc.send('get', `shipping/list`);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `shipping/${id}`);
  }

}
