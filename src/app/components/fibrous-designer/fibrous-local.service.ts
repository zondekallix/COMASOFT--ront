import { Injectable } from '@angular/core';
import { Materials } from 'src/app/models/Materials';



@Injectable({
  providedIn: 'root'
})
export class FibrousLocalService {

  public currentMatrixSelected : Materials
  public currentFibrousSelected : Materials

  constructor() { }
}
