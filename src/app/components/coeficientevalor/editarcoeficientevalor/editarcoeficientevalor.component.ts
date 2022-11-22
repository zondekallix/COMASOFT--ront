import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CoefficientsService } from 'src/app/services/coefficients.service';
import { InternalService } from '../internal.service';

import { Coefficients } from 'src/app/models/Coefficients';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';


@Component({
  selector: 'app-editarcoeficientevalor',
  templateUrl: './editarcoeficientevalor.component.html',
  styleUrls: ['./editarcoeficientevalor.component.css']
})


export class EditarcoeficientevalorComponent implements OnInit, OnChanges {


  coeficienteValor: Coefficients[];
  public currentValorId : Number;

  constructor(private http: HttpClient,
    public internalservice: InternalService,
    public coeficientevalorservice : CoefficientsService,
    public tiposcoeficientesservice: CoefficientTypesViewService,
    public toastr: ToastrService ) { }
  ngOnInit(): void {;
  }


  ngOnChanges(changes: SimpleChanges): void {

  }




}
