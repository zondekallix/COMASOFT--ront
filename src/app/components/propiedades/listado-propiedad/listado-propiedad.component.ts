import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PropertiesM } from 'src/app/models/Properties';
import { PropertyService } from 'src/app/services/property.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listado-propiedad',
  templateUrl: './listado-propiedad.component.html',
  styleUrls: ['./listado-propiedad.component.css']
})
export class ListadoPropiedadComponent implements OnInit {

 propertyList: PropertiesM[];

 constructor( public propertyListservice: PropertyService,
  public toastr: ToastrService ) {
    //this.listado = {} as MaterialTypes;
    //console.log (this.listado);
  }

  ngOnInit(): void {
    //console.log ("onini listado");
    //this.tipomateriaservice.getAllTipos().subscribe( data => {
    //  this.tiposmaterial = data;
      //console.log (this.tiposmaterial);
    //});
    this.propertyListservice.getAllTipos();
    //this.tiposmaterial= this.tipomateriaservice.listadoTipos;
  }

  editarTipo( tipo: PropertiesM){
    //console.log ("editar");
    //console.log (tipo);
    this.propertyListservice.actualizar(tipo);
  }

  eliminarTipo (id: Number){
    //console.log ("eliminar");
    if (confirm('Esta seguro de eliminar?')){
      this.propertyListservice.deleteTipo(id).subscribe ( data => {
        this.toastr.warning ('El tipo de material fue eliminado');
        this.propertyListservice.getAllTipos();
      })
    }
  }

}
