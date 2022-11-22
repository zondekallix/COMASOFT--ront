import { Injectable } from '@angular/core';
import { MaterialTypesM } from 'src/app/models/MaterialTypes';

@Injectable({
  providedIn: 'root'
})
export class InternalserviceService {

  public materialTypesMSeleccionado : MaterialTypesM;

  public currentidMtypeService: Number = 0;;

  //this.serviciointernoeditarmaterial.currentidMtypeService

  constructor() { }
}
