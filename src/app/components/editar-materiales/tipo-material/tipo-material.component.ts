import { Component, OnInit } from '@angular/core';
import { MaterialtypescoefficienttypesService } from 'src/app/services/materialtypescoefficienttypes.service';
import { InternalserviceService } from '../internalservice.service';



@Component({
  selector: 'app-tipo-material',
  templateUrl: './tipo-material.component.html',
  styleUrls: ['./tipo-material.component.css']
})
export class TipoMaterialComponent implements OnInit {

  constructor(public materialcoeficienteservice : MaterialtypescoefficienttypesService,
    public serviciointernoeditarmaterial : InternalserviceService) { }

  ngOnInit(): void {
    let id: Number ;
    id = this.serviciointernoeditarmaterial.currentidMtypeService;
  }

}
