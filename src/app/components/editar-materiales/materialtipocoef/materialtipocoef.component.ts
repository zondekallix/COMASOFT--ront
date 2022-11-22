import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { delay, Subscription } from 'rxjs';
import { CheckBox } from 'src/app/interfases/checkbox';
import { CoefTypeView } from 'src/app/models/CoefTypeView';
import { FibrousDesignerM } from 'src/app/models/FibrousDesigner';
import { MaterialTypesM } from 'src/app/models/MaterialTypes';
import { MaterialTypesCoefficientTypes } from 'src/app/models/MaterialTypesCoefficientTypes';
import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';
import { CoefficientTypesService } from 'src/app/services/coefficient-types.service';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';
import { MaterialtypescoefficienttypesService } from 'src/app/services/materialtypescoefficienttypes.service';

@Component({
  selector: 'app-materialtipocoef',
  templateUrl: './materialtipocoef.component.html',
  styleUrls: ['./materialtipocoef.component.css']
})


export class MaterialtipocoefComponent implements OnInit, OnChanges {

  coeficienteTipos : CoefTypeView [];
  coeficienteTiposSeleccionados: CoefTypeView [];
  localindice: Number[]
  suscripcion:  Subscription;
  tipomaterial: MaterialTypesM;
  idMtypeLlave : Number=0;
  materialTypesId : Number;
  materialCoeficienteTipos : MaterialTypesCoefficientTypes[];
  materialCoeficienteFiltro: MaterialTypesCoefficientTypes[];
  materialCoeficienteFiltrocheck: MaterialTypesCoefficientTypes[];
  materialfiltrado : MaterialTypesCoefficientTypes[];


  @Input() currentidMtypeIn:Number;
  @Input() chk=false;

  constructor(public coeficientetipoViewservice: CoefficientTypesViewService,
    public coeficientetiposervice: CoefficientTypesService,
    public tipomateriaservice: MaterialTypeService,
    public coeficientetypesservice: MaterialtypescoefficienttypesService,
    public toastr: ToastrService ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.actualizarchecks ();
    console.log ('changes')
  }

  private actualizarchecks (){
    //console.log ('init material tipo coef changes');

    this.coeficientetypesservice.getAll()
    this.materialCoeficienteTipos = this.coeficientetypesservice.materialCoeficienteTipos;
    if (this.materialCoeficienteTipos!=undefined){
      this.materialCoeficienteFiltro = this.materialCoeficienteFiltro = this.materialCoeficienteTipos.filter(data => data.idMtype === this.currentidMtypeIn)

    }
    var listacheck : any = document.getElementsByName("checkboxtiposcoef");
    //console.log(this.materialCoeficienteFiltro);
    //console.log (listacheck);

    listacheck.forEach ( (x: { checked: any; value: Number }) => {  //tipo.idCtype en value
      const estadoCheck = x.checked;
      const idCtypeCheck : Number = Number(x.value);
      this.materialCoeficienteFiltrocheck = [];
      this.materialCoeficienteFiltrocheck = this.materialCoeficienteFiltrocheck = this.materialCoeficienteFiltro.filter(data => data.idCtype === idCtypeCheck)
      //console.log ( this.materialCoeficienteFiltrocheck);

      if (this.materialCoeficienteFiltrocheck.length > 0 ) {x.checked = true}
      else {x.checked = false};
      //if (checkestado ) this.localindice.push (idIndex);

    } )

  }
  ngOnInit(): void {
    this.coeficientetipoViewservice.getAll();
    this.coeficienteTipos= this.coeficientetipoViewservice.coeficienteTipos;

    // console.log ('init material tipo coef')
    //this.idMtypeLlave = this.tipomaterial.idMtype || 0;
    // console.log (this.currentidMtypeIn);
  }

  checkValue( tipo : any [], idCtypeP : Number, event: Event){

    this.coeficientetypesservice.getAll()
    this.materialCoeficienteTipos = this.coeficientetypesservice.materialCoeficienteTipos;
    if (this.materialCoeficienteTipos!=undefined){
      this.materialCoeficienteFiltro = this.materialCoeficienteFiltro = this.materialCoeficienteTipos.filter(data => data.idMtype === this.currentidMtypeIn)

    }


    let checks : CheckBox [] = [];
    var listacheck : any = document.getElementsByName("checkboxtiposcoef") as unknown as HTMLInputElement ;

    //console.log (listacheck);

    //barre los checkbox y hace un arreglo espejo con el id y estado de cada uno.
    listacheck.forEach ( (x: { checked: any; value: any }) => {
      const checkestado = x.checked;
      const idIndex : Number = Number(x.value);
      const ck : CheckBox = {
        checked: checkestado,
        valor : idIndex, // en este valor tiene idCtype
        texto: ''
      };
      if (idCtypeP === ck.valor) {
        checks.push (ck); //esto no hace falta
        //para tener el idCM segun el idCtype
        this.materialfiltrado = [];
        console.log (this.materialCoeficienteFiltro);
        console.log (ck.valor);

        if (ck.checked){
          //es verdadero, hay que insertar
          console.log ('insertar');
          console.log (ck.valor);
          this.materialfiltrado = [];
          this.materialfiltrado.push (
            {
              idMtype: this.currentidMtypeIn,
              idCtype: ck.valor,
              idCm: 0
            }
          );
          this.coeficientetypesservice.postTipo(this.materialfiltrado[0]).subscribe ( data=> {
            this.toastr.success('Tipo adicionado');
            this.materialfiltrado = [];
            //this.actualizarchecks();
          });
        }
        else{
          //es falso, hay que borrar
          console.log ('borrar');

          this.materialfiltrado = this.materialfiltrado = this.materialCoeficienteFiltro.filter(data => data.idCtype === idIndex);
          const idCM = this.materialfiltrado[0].idCm;
          console.log (idCM);
          console.log ( this.materialfiltrado );
          this.coeficientetypesservice.deleteTipo (idCM).subscribe ( data => {
            this.toastr.warning ('Tipo eliminado');

          });
        }

      }
    } )
    // con currentidMtypeIn si

    //this.actualizarchecks();
    // var checkactual : any = listacheck[idCtypeP];
    // this.coeficienteTiposSeleccionados = [];

    // const coeficienteslistados : CoefTypeView[]= tipo;
    //console.log (listacheck);

    /* listacheck.forEach ( (x: { checked: any; value: any }) => {
      const checkestado = x.checked;
      const idIndex : Number = Number(x.value);
      if (checkestado ) this.localindice.push (idIndex);

    } ) */
    //console.log (this.localindice);

    // let resultado : CoefTypeView [] = coeficienteslistados.filter ( indiceDato =>
    //     this.localindice.includes(indiceDato.idCtype));
    //console.log (resultado);



  }

  filtro(element:any,index:any,array:any){

  }
}
