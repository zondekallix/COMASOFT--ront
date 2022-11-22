import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { CoefTypeView } from 'src/app/models/CoefTypeView';
import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';
import { CoefficientTypesService } from 'src/app/services/coefficient-types.service';






@Component({
  selector: 'app-listado-coeficiente',
  templateUrl: './listado-coeficiente.component.html',
  styleUrls: ['./listado-coeficiente.component.css']
})


export class ListadoCoeficienteComponent implements OnInit {

  coeficienteTipos : CoefTypeView [];

  constructor(public coeficientetipoViewservice: CoefficientTypesViewService,
    public coeficientetiposervice: CoefficientTypesService,
    public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.coeficientetipoViewservice.getAll();
    console.log (this.coeficienteTipos);

  }

  editarTipo( tipo: CoefTypeView){
    console.log ("editar");
    console.log (tipo);
    this.coeficientetiposervice.actualizar(tipo);


  }

  eliminarTipo (id: Number){
    console.log ("eliminar");
    if (confirm('Esta seguro de eliminar?')){
      this.coeficientetiposervice.delete(id).subscribe ( data => {
        this.toastr.warning ('El tipo de material fue eliminado');
        this.coeficientetiposervice.getAll();
      })
    }
  }
}
