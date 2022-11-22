import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoefTypeView } from 'src/app/models/CoefTypeView';
import { SymmetryM } from 'src/app/models/Symmetry';
import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';
import { CoefficientTypesService } from 'src/app/services/coefficient-types.service';
import { PlantillaindicesService } from 'src/app/services/plantillaindices.service';
import { SymmetryServiceService } from 'src/app/services/symmetry-service.service';
import { IndiceLocalService } from '../indicelocal.service';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, OnChanges {


  coeficienteTipos : CoefTypeView [];
  symmetryList: SymmetryM[];
  public currentCoeficiente : any;
  public currentSimetria : any;


  constructor(
    public coeficientetipoViewservice: CoefficientTypesViewService,
    public coeficientetiposervice: CoefficientTypesService,
    public symmetryListService: SymmetryServiceService,
    public indiceservice: IndiceLocalService,
    public plantillaindice: PlantillaindicesService,
    public toastr: ToastrService) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log (changes);
  }

  ngOnInit(): void {
    this.coeficientetipoViewservice.getAll();
    this.symmetryListService.getAllTipos();
  }



  public selectCoficiente(event: any, item: any, tipo: CoefTypeView) {
    this.currentCoeficiente = item;
    const localcoef : CoefTypeView = tipo;
    this.indiceservice.currentCoeficiente = localcoef;
    //this.plantillaindice.actualizar(this.currentCoeficiente);
    //this.plantillaindice.getAllfitros (0,0);
    //console.log (this.indiceservice.currentCoeficiente);
    //.log ( this.indiceservice.currentSimetria);
  }

  public selectSimetria(event: any, item: any, tipo : SymmetryM) {
    this.currentSimetria = item;
    const localsimetria : SymmetryM = tipo;
    this.indiceservice.currentSimetria = localsimetria;
    //console.log (this.indiceservice.currentCoeficiente);
    //console.log ( this.indiceservice.currentSimetria);
  }


}
