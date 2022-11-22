import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Materials } from 'src/app/models/Materials';
import { FibrousDesignerService } from 'src/app/services/fibrous-designer.service';
import { MaterialsService } from 'src/app/services/materials.service';
import { FibrousLocalService } from '../fibrous-local.service';




@Component({
  selector: 'app-listado-materiales',
  templateUrl: './listado-materiales.component.html',
  styleUrls: ['./listado-materiales.component.css']
})
export class ListadoMaterialesComponent implements OnInit, OnChanges {

  @Output() newItemEventM = new EventEmitter<Number>();



  addNewItemM(value: Number) {
    this.newItemEventM.emit(value);
  }


  materialesList: Materials[];
  public currentMaterialMatrix: any;
  public currentMaterialFibrous: any;

  constructor(
    public materialService: MaterialsService,
    public fibrousService: FibrousDesignerService,
    public fibrousLocalService: FibrousLocalService,
    public toastr: ToastrService,

  ) { }


  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }
  ngOnInit(): void {
    this.materialService.getAllTipos();
  }
  public selectMatrix(event: any,materialMatrix:Materials)
  {
    this.currentMaterialMatrix = materialMatrix.nameMaterial;
    const localMat: Materials = materialMatrix;
    this.fibrousLocalService.currentMatrixSelected = localMat;
    // console.log(materialMatrix.idMaterial);
    this.addNewItemM(materialMatrix.idMaterial);
  }
  // public selectFibre(event: any,materialFibre:Materials)
  // {
  //   this.currentMaterialFibrous = materialFibre.nameMaterial;
  //   const localFib : Materials = materialFibre;
  //   this.fibrousLocalService.currentFibrousSelected = localFib;
  //   console.log(materialFibre.idMaterial);
  //   this.addNewItemF(materialFibre.idMaterial);

  // }
}
