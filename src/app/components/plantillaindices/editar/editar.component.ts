import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CoefficientTypes } from 'src/app/models/CoefficientType';
import { IndexTables } from 'src/app/models/IndexTables';
import { SymmetryM } from 'src/app/models/Symmetry';
import { PlantillaindicesService } from 'src/app/services/plantillaindices.service';
import { IndiceLocalService } from '../indicelocal.service';





@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})


export class EditarComponent implements OnInit, OnChanges {
  suscripcion: Subscription;
  tipocoeficiente: CoefficientTypes;


  @Input () CoefficientTypesInput! : CoefficientTypes;
  @Input () SimetriaInput! : SymmetryM;

  constructor( public plantillaindice: PlantillaindicesService,
    public indiceservice: IndiceLocalService,
    public toastr: ToastrService) { }


  ngOnInit(): void {
    //console.log (this.indiceservice.currentCoeficiente);
    //console.log ( this.indiceservice.currentSimetria);
    this.actualizartablaindices ();
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.actualizartablaindices ();
  }


  editarTipo(indice : IndexTables){
    this.plantillaindice.actualizar(indice);
  }

  eliminarTipo(idIndex : Number){
    if (confirm('Esta seguro de eliminar?')){
      this.plantillaindice.delete(idIndex).subscribe ( data => {
        this.toastr.warning ('El tipo de material fue eliminado');
        this.actualizartablaindices();
      })
    }
  }


 private actualizartablaindices (){
  if (this.indiceservice.currentCoeficiente !== undefined && this.indiceservice.currentSimetria !== undefined){
    var idCtype : Number =0 ;
    var idSymmetry: Number = 0;
    var nuevo = this.CoefficientTypesInput;
    idCtype = this.indiceservice.currentCoeficiente.idCtype;
    idSymmetry = this.indiceservice.currentSimetria.idSymmetry;
    console.log (idCtype);
    console.log (idSymmetry);
    this.plantillaindice.getAllfitros(idCtype, idSymmetry);
  }



 }
}
