import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Coefficients } from 'src/app/models/Coefficients';
import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';
import { CoefficientsService } from 'src/app/services/coefficients.service';
import { InternalService } from '../../internal.service';

@Component({
  selector: 'app-tablavalor',
  templateUrl: './tablavalor.component.html',
  styleUrls: ['./tablavalor.component.css']
})
export class TablavalorComponent implements OnInit {

  coeficienteValor: Coefficients[];
  coeficienteValorTodos: Coefficients[]=[];

  public currentValorId : Number;
  public c : Coefficients [] = [];

  @Input () currentMaterialId! : Number;
  @Input () idCtypeSeleccionado! : Number;
  @Input () prefijo: string;

  constructor(private http: HttpClient,
    public internalservice: InternalService,
    public coeficientevalorservice : CoefficientsService,
    public tiposcoeficientesservice: CoefficientTypesViewService,
    public toastr: ToastrService) { }

  ngOnInit(): void {



  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log (this.currentMaterialId);
    // console.log (this.idCtypeSeleccionado);
    this.coeficientevalorservice.coeficientesvalorbyIdMaterialidCtype=[];
    this.c =[];
    //this.coeficientevalorservice.getAllbyIdMaterialIdCtype(this.currentMaterialId, this.idCtypeSeleccionado);
    if (this.currentMaterialId != undefined && this.idCtypeSeleccionado != undefined){
      this.coeficientevalorservice.getAllObs ().subscribe ( data => {
        const v : Coefficients[]= data as Coefficients [];
        v.forEach ( elemento => {
          if (elemento.idMaterial === this.currentMaterialId && elemento.idCtype === this.idCtypeSeleccionado  ){
            this.c.push (elemento);
          }
        })
      })
    };

    //console.log ('idMaterialSeleccionado ' + this.idMaterialSeleccionado);
    //console.log ('idCtypeSeleccionado ' + this.idCtypeSeleccionado);
    //console.log (this.c);
  }

  public select(event: any, item: Number, tipo: Coefficients) {
    //this.coeficienteValor = item;
    //const localitem : Coefficients = tipo;
    const localid : Number = Number(item);
    //this.internalservice.currentMaterialDataTypSyms = localitem;
    this.currentValorId = localid;
    //this.tipoMaterialViewservice.actualizar(tipo);
    //this.materialdata.actualizar(tipo);
    //this.internalservice.idSymmetry = tipo.idSymmetry;
    //this.plantillaindice.actualizar(this.currentCoeficiente);
    //this.plantillaindice.getAllfitros (0,0);
    //console.log (this.internalservice.currentMaterialDataTypSyms);
    //console.log (tipo);
    //.log ( this.indiceservice.currentSimetria);
  }

  eliminarTipo (id: Number){
    //console.log ("eliminar");
    //console.log (id);
    if (confirm('Esta seguro de eliminar?')){
      this.coeficientevalorservice.delete(id).subscribe ( data => {
        this.toastr.warning ('El tipo de material fue eliminado');
        this.coeficientevalorservice.getAll();
      })
    }
  }

  actualizar (id: Number, coeficientevalor: Coefficients){
    //console.log (id);
    coeficientevalor.value = Number(coeficientevalor.value);
    //console.log (coeficientevalor);

    this.coeficientevalorservice.put (id, coeficientevalor).subscribe ( data =>{
      this.toastr.success('Valor de coeficiente actualizado');
      this.coeficientevalorservice.getAll();
    }) ;
    this.coeficientevalorservice.getAll();
  }
}
