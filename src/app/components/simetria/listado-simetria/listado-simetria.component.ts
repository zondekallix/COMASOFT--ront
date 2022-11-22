import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SymmetryM } from 'src/app/models/Symmetry';
import { SymmetryServiceService } from 'src/app/services/symmetry-service.service';

@Component({
  selector: 'app-listado-simetria',
  templateUrl: './listado-simetria.component.html',
  styleUrls: ['./listado-simetria.component.css']
})
export class ListadoSimetriaComponent implements OnInit {

  symmetryList: SymmetryM[];

  constructor( public symmetryListService: SymmetryServiceService,
   public toastr: ToastrService ) {
     //this.listado = {} as MaterialTypes;
     //console.log (this.listado);
   }

   ngOnInit(): void {
     //console.log ("onini listado");
     //this.tipomateriaservice.getAllTipos().subscribe( data => {
     //  this.tiposmaterial = data;
       //console.log (this.tiposmaterial);
     //});
     this.symmetryListService.getAllTipos();
     //this.tiposmaterial= this.tipomateriaservice.listadoTipos;
   }

   editarTipo( tipo: SymmetryM){
     console.log ("editar");
     console.log (tipo);
     this.symmetryListService.actualizar(tipo);
   }

   eliminarTipo (id: Number){
     //console.log ("eliminar");
     if (confirm('Esta seguro de eliminar?')){
       this.symmetryListService.deleteTipo(id).subscribe ( data => {
         this.toastr.warning ('El tipo de material fue eliminado');
         this.symmetryListService.getAllTipos();
       })
     }
   }
}
