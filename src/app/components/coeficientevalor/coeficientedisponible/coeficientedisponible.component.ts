import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

import { HttpClient } from '@angular/common/http';

import { Pipe, PipeTransform } from '@angular/core';

import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';
import { PlantillaindicesService } from 'src/app/services/plantillaindices.service';
import { IndexTables } from 'src/app/models/IndexTables';
import { objetodrop } from 'src/app/models/objetosdrop';
import { InternalService } from '../internal.service';
import { CoefficientsService } from 'src/app/services/coefficients.service';
import { Coefficients } from 'src/app/models/Coefficients';


@Component({
  selector: 'app-coeficientedisponible',
  templateUrl: './coeficientedisponible.component.html',
  styleUrls: ['./coeficientedisponible.component.css']
})


export class CoeficientedisponibleComponent implements OnInit, OnChanges {
  form                : FormGroup;

  indicesdisponibles  : IndexTables[] = [];
  coeficientesexistentes : Coefficients[] = [];
  localindice : Number[]=[];
  indexTableSeleccionados : IndexTables []=[];

  dropdownSettings    : IDropdownSettings={};
  dropelementos       : objetodrop;
  dropdownList        : objetodrop[]=[];

  isButtonVisible : boolean;

  public inputs = [];; //esto es para tener un array en el ts que tenga la informacion de los checkbox

  @Input () idSimetriaInput : Number;

  constructor( private formBuilder: FormBuilder,
    public coeficientetypeservice: CoefficientTypesViewService,
    public plantillaindice: PlantillaindicesService,
    public coeficientevalorservice : CoefficientsService,
    public internalservice: InternalService,
    private http: HttpClient
    ) {

      this.coeficientetypeservice.getAll();

      //this.actualizartablaindices ( 0, 0 ); // se actualiza con el idsimetria que venga de la seleccion del material.
      //this.indicesdisponibles = internalservice.tablaindicesdisponibles; // con indicesdisponibles se barre el cjecklist

      this.form = this.formBuilder.group (
        {
          idSymmetry: 0,
          checkboxList: 0
        }
      )

  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log ('changes en disponible');



  }

  ngOnInit(): void {

    this.isButtonVisible = true;

    this.coeficientevalorservice.getAllObs().subscribe (
      data => {
        this.coeficientesexistentes = data
        //console.log (data);

      }
    );

    //this.coeficientetypeservice.getAll();
    //this.actualizartablaindices ( 0, 0 );
    //const indicesactuales : IndexTables[] = this.plantillaindice.indices;
    //console.log (indicesactuales);
    //console.log (indicesactuales);


   /*  indicesactuales.forEach ( (elemento) => {
      // this.dropelementos.item_id = elemento.idIndex;
      // this.dropelementos.item_text = elemento.indexNumber.toString();
      console.log (elemento);
      // this.dropdownList.push(this.dropelementos);
    }); */


    //this.dropdownList.push ()
    /* this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];  */


 /*    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      noDataAvailablePlaceholderText: "No hay elementos"
    } */

    //console.log (this.dropdownList);
  }

  onChangeDropSimetria( event: any  ){
    console.log ('change drop simetria');
    let selectedTipoCoef : Number = Number(event.target.value);
    //console.log (this.internalservice.tablaindicesdisponibles);
    this.plantillaindice.getAllSimetriasFiltro(selectedTipoCoef , this.idSimetriaInput );
    this.indicesdisponibles =  this.internalservice.tablaindicesdisponibles;// con indicesdisponibles se barre el cjecklist
    if (this.indicesdisponibles.length >0 ) this.isButtonVisible = false;
    else this.isButtonVisible = true;
    //console.log (this.internalservice.tablaindicesdisponibles);
    console.log (this.indicesdisponibles);
  }


  onChangeCheck ( event : Event ){
    console.log ('change check simetria');
  }


  mostrarcheck(){


  }

  agregarindices (){

    this.indexTableSeleccionados.forEach (elemento => {


    });




  }

  checkValue(){

    this.coeficientevalorservice.getAllObs().subscribe (
      data => {
        this.coeficientesexistentes = data
        //console.log (data);
      }
    );

    var listacheck : any = document.getElementsByName("checkboxindices");
    this.indexTableSeleccionados = [];
    this.localindice =[];

    listacheck.forEach ( (x: { checked: any; value: any }) => {
      const checkestado = x.checked;
      const idIndex : Number = Number(x.value);
      if (checkestado ) this.localindice.push (idIndex);

    } )
    this.localindice.forEach ( elemento => {
      const indicelocalfiltro : IndexTables[] = [];

    })

    // let resultado : IndexTables [] = this.indicesdisponibles.filter ( dato =>
    //    this.localindice.filter ( indiceseleccion => dato.idIndex === indiceseleccion)

    let resultado : IndexTables [] = this.indicesdisponibles.filter ( indiceDato =>
        this.localindice.includes(indiceDato.idIndex));

    //this.indexTableSeleccionados = this.indicesdisponibles.filter ( item => this.indicesdisponibles.includes(item.idIndex));
    //this.localindice.filter ( item => this.indexTableSeleccionados.includes(item.idIndex));

    console.log ('indices locales seleccionados');
    console.log (this.localindice);
    console.log (this.coeficientesexistentes);
    console.log (resultado);

  }

}
