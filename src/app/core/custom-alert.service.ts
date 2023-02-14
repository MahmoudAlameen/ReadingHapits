import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertMessage } from '../classes/AlertMessage';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {
  alert:BehaviorSubject<AlertMessage> = new BehaviorSubject(new AlertMessage());
  constructor() { }
}
