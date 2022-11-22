import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Coefficients } from 'src/app/models/Coefficients';
import { FunctionResultsM } from 'src/app/models/FunctionResults';
import { LaminousDesignerM } from 'src/app/models/LaminousDesigner';
import { Materials } from 'src/app/models/Materials';
import { MaterialTypesM } from 'src/app/models/MaterialTypes';
import { CoefficientsService } from 'src/app/services/coefficients.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LaminousDesignerService } from 'src/app/services/laminous-designer.service';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';
import { MaterialsService } from 'src/app/services/materials.service';

@Component({
  selector: 'app-laminous-designer',
  templateUrl: './laminous-designer.component.html',
  styleUrls: ['./laminous-designer.component.css']
})
export class LaminousDesignerComponent implements OnInit {
  form    : FormGroup;
  suscripcion:  Subscription;
  laminousDesigner: LaminousDesignerM;
  functionResults:FunctionResultsM;
  fractionList:number[];
  materialList:Materials[];
  idGeometry:Number;
  coeffInfo:Coefficients[];
  selectMaterialIndex: Number;
  test:string;
  fraction: Number;
  selectedMType:Number;
  selectedFunction:Number;
  functionName: string;
  mostrarFuncion:boolean;
  botonvalido : boolean;
  showCoeff:boolean;


  constructor(private formBuilder: FormBuilder,
    public laminosuDesignerService: LaminousDesignerService,
    public materialService: MaterialsService,
    public coefficientService: CoefficientsService,
    public materialTypesService: MaterialTypeService,
    public algorithmService:FileUploadService,
    public toastr: ToastrService ) {
      this.form = this.formBuilder.group (
        {
        }
      )
      this.materialService.getAllTipos()
      this.materialList = [];
      this.fractionList = [];
      this.coeffInfo = [];
      this.idGeometry = 1;
      this.botonvalido = false;
      this.mostrarFuncion = false;
      this.showCoeff = true;
      this.selectedMType = 0;
      this.functionName = "";
      this.selectedMType = 0;
      materialTypesService.getAllTipos();
    }
  ngOnInit(): void {
    }
  makeRequest (){
    const laminousDesigner: LaminousDesignerM = {
      materialIdList:this.materialList.map(material =>  material.idMaterial),
      fractionList: this.fractionList,
      geometry : this.idGeometry,
      functionName: this.functionName,
      idMtype: this.selectedMType
    }
    console.log("sending data to Backend Function")
    this.laminosuDesignerService.putTipo (laminousDesigner).subscribe ( data => {
      console.log (data);
      this.functionResults = data;
    })
 }

 addToMaterialList(tipo:Materials)
 {
  this.materialList.push(tipo);
  this.fractionList.push(0);
}
 deleteMaterialList(index:number)
 {
  this.materialList.splice(index,1)
  this.fractionList.splice(index,1)
 }
 watchMaterial(tipo:Materials,index:Number)
 {
  this.coefficientService.getAll_byIdMaterial(tipo.idMaterial)
  this.selectMaterialIndex = index;
  this.coeffInfo = this.coefficientService.coeficientesvalorbyIdMaterial
  console.log(this.coeffInfo)
 }

 selectGeometry(selected:Number){
  this.idGeometry = selected; console.log("Id gemoetry = "+ this.idGeometry)}

  materialTypeSelector(materialType: MaterialTypesM){this.selectedMType = materialType.idMtype;this.showFunction()}
  functionSelector(event: any){
    this.functionName = event.target.value;console.log(this.functionName);
    this.validateButton()
  }

showFunction()
  {
    this.mostrarFuncion =  this.idGeometry != 0 && this.selectedMType != 0
    console.log("idGeo = "+ this.idGeometry + "|| idMType = "+this.selectedMType)
    if(this.mostrarFuncion)
    {
      let geometryString = this.idGeometry == 1 ? "Serie" : "Paralelo";
      this.algorithmService.getFilesWithConditon(this.selectedMType,geometryString,"Laminado");
    }
  }

validateButton(){
  console.log("AAAAAAAAAAAAA")
  let accumulator = 0;
  this.fractionList.forEach(element =>accumulator+=element)

  this.botonvalido = this.functionName!= ""  &&
  this.fractionList.length>0 &&
  accumulator == 1;

}
saveMaterial(){}
}
