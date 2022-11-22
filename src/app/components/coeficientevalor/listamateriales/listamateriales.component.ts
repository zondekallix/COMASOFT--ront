import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IndexTables } from 'src/app/models/IndexTables';
import { MaterialDataTypSyms } from 'src/app/models/MaterialDataTypSyms';
import { MaterialDataTypSymsService } from 'src/app/services/material-data-typ-syms.service';
import { PlantillaindicesService } from 'src/app/services/plantillaindices.service';
import { InternalService } from '../internal.service';
import { MaterialtypescoefficienttypesService } from 'src/app/services/materialtypescoefficienttypes.service';
import { MaterialTypesCoefficientTypes } from 'src/app/models/MaterialTypesCoefficientTypes';
import { CoefficientsService } from 'src/app/services/coefficients.service';
import { CoefficientTypes } from 'src/app/models/CoefficientType';
import { Coefficients } from 'src/app/models/Coefficients';
import { IndextablematerialtcoefService } from 'src/app/services/indextablematerialtcoef.service';
import { IndexTableMaterialTcoefTs } from 'src/app/models/IndexTableMaterialTcoefTs';


@Component({
  selector: 'app-listamateriales',
  templateUrl: './listamateriales.component.html',
  styleUrls: ['./listamateriales.component.css']
})
export class ListamaterialesComponent implements OnInit, OnChanges {

  tipoMaterialView: MaterialDataTypSyms[];
  currentMaterialId : Number;
  indextablematerialtcoef : IndexTableMaterialTcoefTs[];
  coeficientesvalor : Coefficients[];

  constructor(public tipoMaterialViewservice: MaterialDataTypSymsService,
    public materialdata : MaterialDataTypSymsService,
    public internalservice : InternalService,
    public toastr: ToastrService,
    public coeficientevalorservice : CoefficientsService,
    public indextablematerialtcoefService : IndextablematerialtcoefService

    ) {


      }

  ngOnInit(): void {
    this.tipoMaterialViewservice.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log (changes);

  }

  public selectMaterial(event: any, item: any, tipo: MaterialDataTypSyms) {

    //this.plantillaindice.actualizar(this.currentCoeficiente);
    //this.plantillaindice.getAllfitros (0,0);
    //console.log (this.internalservice.currentMaterialDataTypSyms);
    //console.log (tipo);
    //.log ( this.indiceservice.currentSimetria);
    this.indextablematerialtcoefService.getAllObs().subscribe ( dataindicetipos => {
       //este bloque es para que no se dispare antes de regresar el get
       this.tipoMaterialView = item;
       const localitem : MaterialDataTypSyms = tipo;
       const localid : Number = tipo.idMaterial;
       this.internalservice.currentMaterialDataTypSyms = localitem;
       this.currentMaterialId = localid; // id material para insertar en [Coefficients]
       const idSymmetryId : Number = tipo.idSymmetry; //id simetria para buscar en [IndexTables] para ver que Indexnumber y su idCtype. servicio PlantillaindicesService
       this.internalservice.currentMaterialId = this.currentMaterialId;
       this.materialdata.actualizar(tipo);
       this.internalservice.idSymmetry = tipo.idSymmetry;
       console.log (this.currentMaterialId);

       this.indextablematerialtcoef = dataindicetipos as IndexTableMaterialTcoefTs [];
       this.indextablematerialtcoef = this.indextablematerialtcoef.filter ( elementoindex => elementoindex.idSymmetry === tipo.idSymmetry && elementoindex.idMtype === tipo.idMType);
        console.log (this.indextablematerialtcoef);

      this.coeficientevalorservice.getAllObs ().subscribe ( datacoeficiente => {
        this.coeficientesvalor = datacoeficiente as Coefficients[];
        this.coeficientesvalor = this.coeficientesvalor.filter (elemento => elemento.idMaterial === tipo.idMaterial);
        console.log (this.coeficientesvalor);
        this.indextablematerialtcoef.forEach ( elementoindexmaterial => {
          const coeficientevalorfiltro : Coefficients[] = this.coeficientesvalor.filter (elementocoef => elementocoef.idCtype === elementoindexmaterial.idCtype
            && elementocoef.index === elementoindexmaterial.indexNumber);
            if (coeficientevalorfiltro.length === 0 ){
              console.log ('insertar')
              const coeficienteinsertar : Coefficients = {
                idCoefficient : 0,
                idCtype : elementoindexmaterial.idCtype,
                idMaterial : tipo.idMaterial,
                index : elementoindexmaterial.indexNumber,
                value : 0
              }
              this.coeficientevalorservice.post (coeficienteinsertar).subscribe ( );
              this.tipoMaterialViewservice.getAll();
            }
            else {
              console.log ('no hacer nada')
            }
        })
      })
    })
  }

}
