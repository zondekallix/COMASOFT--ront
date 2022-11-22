import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoefficientTypes } from 'src/app/models/CoefficientType';
import { SymmetryM } from 'src/app/models/Symmetry';

@Injectable({
  providedIn: 'root'
})
export class IndiceLocalService {

  public currentCoeficiente : CoefficientTypes;
  public currentSimetria : SymmetryM;

  constructor() { }

  
}
