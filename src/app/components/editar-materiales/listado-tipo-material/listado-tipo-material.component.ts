import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MaterialTypesM } from 'src/app/models/MaterialTypes';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';
import { MaterialtypescoefficienttypesService } from 'src/app/services/materialtypescoefficienttypes.service';
import { InternalserviceService } from '../internalservice.service';

@Component({
  selector: 'app-listado-tipo-material',
  templateUrl: './listado-tipo-material.component.html',
  styleUrls: ['./listado-tipo-material.component.css']
})


export class ListadoTipoMaterialComponent implements OnInit {

 tiposmaterial: MaterialTypesM[];
 public currentidMtype : Number;

 @Output() currentidMtypeOut : Number;

 constructor( public tipomateriaservice: MaterialTypeService,
  public toastr: ToastrService,
  public materialcoeficienteservice : MaterialtypescoefficienttypesService,
  public serviciointernoeditarmaterial : InternalserviceService ) {
    //this.listado = {} as MaterialTypes;
    //console.log (this.listado);
  }

  ngOnInit(): void {
    //console.log ("onini listado");
    //this.tipomateriaservice.getAllTipos().subscribe( data => {
    //  this.tiposmaterial = data;
      //console.log (this.tiposmaterial);
    //});
    this.tipomateriaservice.getAllTipos();
    //this.tiposmaterial= this.tipomateriaservice.listadoTipos;
  }

  editarTipo( tipo: MaterialTypesM){
    console.log ('seleccionado en listado');
    //console.log (tipo);
    this.tipomateriaservice.actualizar(tipo);

    this.currentidMtype = tipo.idMtype;

    this.serviciointernoeditarmaterial.currentidMtypeService = this.currentidMtype;

    this.currentidMtypeOut = this.currentidMtype;
    //this.materialcoeficienteservice.getAll();
    console.log (this.serviciointernoeditarmaterial.currentidMtypeService);
  }

  eliminarTipo (id: Number){
    //console.log ("eliminar");
    if (confirm('Esta seguro de eliminar?')){
      this.tipomateriaservice.deleteTipo(id).subscribe ( data => {
        this.toastr.warning ('El tipo de material fue eliminado');
        this.tipomateriaservice.getAllTipos();
      })
    }
  }

}



