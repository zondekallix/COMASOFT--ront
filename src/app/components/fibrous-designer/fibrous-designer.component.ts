import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CompMatData } from 'src/app/models/CompMatData';
import { FibrousDesignerM } from 'src/app/models/FibrousDesigner';
import { FunctionResultsM } from 'src/app/models/FunctionResults';
import { FibrousDesignerService } from 'src/app/services/fibrous-designer.service';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';
import {FileUploadService} from 'src/app/services/file-upload.service'
import { MaterialTypesM } from 'src/app/models/MaterialTypes';
import { AlgorithmInfo } from 'src/app/models/AlgorithmInfo';
import { FunctionMultipleResultsM } from 'src/app/models/FunctionMultipleResults';


@Component({
  selector: 'app-fibrous-designer',
  templateUrl: './fibrous-designer.component.html',
  styleUrls: ['./fibrous-designer.component.css']
})


export class FibrousDesignerComponent implements OnInit{

  form    : FormGroup;
  suscripcion:  Subscription;
  fibrousDesigner: FibrousDesignerM;
  functionResults!:FunctionResultsM;
  multipleResults: FunctionMultipleResultsM;
  showCoeff: Boolean
  angulos: Number[] = [15,30,45,60,90];

  botonvalido : boolean;
  angle: Number = 0;
  idMatrix:Number;
  idFibrous:Number;
  idGeometry:Number;
  fraction: Number;
  selectedMType:Number;
  selectedFunction:Number;
  functionName: string;
  mostrarFuncion:boolean;


  constructor( private formBuilder: FormBuilder,
    public fibrousDesignerService: FibrousDesignerService,
    public materialTypesService: MaterialTypeService,
    public algorithmService:FileUploadService,
    public toastr: ToastrService ) {
      this.form = this.formBuilder.group (
        {
          matrixCoeff:[0, [Validators.required]],
          fibrousCoeff:[0, [Validators.required]],
          fraction:[0, [Validators.required]],
          angle: [0, [Validators.required]],
          geometry: [0,[Validators.required]]
        }
      )
      this.idMatrix = 0;
      this.idFibrous = 0;
      this.idGeometry = 1;
      this.botonvalido = false;
      this.mostrarFuncion = false;
      this.selectedMType = 0;
      this.functionName = "";
      this.selectedMType = 0;
      materialTypesService.getAllTipos();
    }
  ngOnInit(): void {

      // let geometryString = this.idGeometry == 1 ? "Hexagonal" : "Cuadrada";
      // this.algorithmService.getFilesWithConditon(1,geometryString,"Fibroso");

  }




  makeRequest (){
    console.log("Hola");
    console.log(this.algorithmService.filtredData);
    this.showCoeff = true;
    console.log ('editar');

    const fibrousDesigner: FibrousDesignerM = {
      matrixCoeffId: this.idMatrix,
      fibrousCoeffId: this.idFibrous,
      fraction: this.fraction,
      angle: this.angle,
      geometry : this.idGeometry,
      functionName: this.functionName,
      idMtype: this.selectedMType
    }
    console.log (fibrousDesigner);
    this.fibrousDesignerService.putTipo (fibrousDesigner).subscribe ( data => {
      this.functionResults = data;
    })
 }

  assignMatrix(id:Number){this.idMatrix = id;  this.validateButton();}
  assignFibre(id:Number){this.idFibrous = id;  this.validateButton();}
  selectGeometry(selected:Number){
    this.idGeometry = selected;
    this.showCoeff = false
    this.showFunction();
  }
  asignarFraction(){
    this.fraction = this.form.get("fraction")?.value;
    this.validateButton();
  }
  funcionangulo(valor : any){
    this.angle = valor;
    this.validateButton();
  }
  materialTypeSelector(materialType: MaterialTypesM){this.selectedMType = materialType.idMtype;this.showFunction()}
  functionSelector(event: any){this.functionName = event.target.value;console.log(this.functionName);this.validateButton()}

  validateButton()
  {
    this.botonvalido =   this.functionName!= "" && this.angle != 0 && (this.selectedFunction != 0) &&this.idMatrix != 0 && this.idFibrous != 0 && this.fraction>0 && this.fraction<=1;
  }
  showFunction()
  {
    this.mostrarFuncion =  this.idGeometry != 0 && this.selectedMType != 0
    console.log("idGeo = "+ this.idGeometry + "|| idMType = "+this.selectedMType)
    if(this.mostrarFuncion)
    {
      let geometryString = this.idGeometry == 1 ? "Hexagonal" : "Cuadrada";
      this.algorithmService.getFilesWithConditon(this.selectedMType,geometryString,"Fibroso");
    }
  }
  saveMaterial(){}


  makeRequestMultiple()
  {
    const fibrousDesigner: FibrousDesignerM = {
      matrixCoeffId: this.idMatrix,
      fibrousCoeffId: this.idFibrous,
      fraction: this.fraction,
      angle: this.angle,
      geometry : this.idGeometry,
      functionName: this.functionName,
      idMtype: this.selectedMType
    }
    this.fibrousDesignerService.putMultiple (fibrousDesigner).subscribe ( data => {
      this.multipleResults = data;
    })
  }

}
