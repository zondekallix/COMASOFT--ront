import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { IndexTables } from 'src/app/models/IndexTables';
import { Subscription } from 'rxjs';
import { PlantillaindicesService } from 'src/app/services/plantillaindices.service';
import { IndiceLocalService } from '../indicelocal.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editarindice',
  templateUrl: './editarindice.component.html',
  styleUrls: ['./editarindice.component.css']
})
export class EditarindiceComponent implements OnInit {
  indices: IndexTables[];
  indice: IndexTables;
  idLlave: Number =0;
  form    : FormGroup;
  suscripcion: Subscription;

  constructor(private formBuilder: FormBuilder,
    public plantillaindice: PlantillaindicesService,
    public indiceservice: IndiceLocalService,
    public toastr: ToastrService) {
      this.form = this.formBuilder.group (
        {
          indexNumber: ['', [Validators.required]]
        }
      )

     }

  ngOnInit(): void {
    this.suscripcion = this.plantillaindice.getAll$().subscribe( data => {

      this.indice = data as IndexTables;
      //console.log (this.tipomaterial);
      this.form.patchValue (
        {
          indexNumber: this.indice.indexNumber
        }
      );
      this.idLlave = this.indice.idIndex || 0;
    })
  }

  guardarTipo (){
    //esto es para ver si es una edicion o es una actualizacion
    if(this.idLlave === 0){
      this.agregar();
    } else {
      this.editar();
    }
  }

  ngOnDestroy(): void {
    if (this.suscripcion)
    {

    this.suscripcion.unsubscribe();
    if (this.indiceservice.currentCoeficiente != undefined)
     {this.indiceservice.currentCoeficiente.idCtype=0;}
    if (this.indiceservice.currentSimetria != undefined)
    {this.indiceservice.currentSimetria.idSymmetry=0;}
    this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
      {
        idCtype:  0,
        idSymmetry: 0,
        indexNumber: 0
      });
    }
  }

  agregar (){
    console.log ('insertar');
    var idCtype : Number =0 ;
    var idSymmetry: Number = 0;
    idCtype = this.indiceservice.currentCoeficiente.idCtype;
    idSymmetry = this.indiceservice.currentSimetria.idSymmetry;
    const indiceactual: IndexTables = {
      idIndex: 0,
      idCtype:  idCtype,
      idSymmetry: idSymmetry,
      indexNumber: Number(this.form.get('indexNumber')?.value)
    }
    console.log (this.idLlave);
    console.log (indiceactual);
    this.plantillaindice.post (indiceactual).subscribe( data => {
      this.toastr.success('Plantilla de indice de coeficiente agregado');
      this.plantillaindice.getAllfitros(idCtype, idSymmetry);
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
      {
        idCtype:  0,
        idSymmetry: 0,
        indexNumber: 0
      });
      this.form.reset;
    });


  }

  editar (){
    console.log ('editar');
    var idCtype : Number =0 ;
    var idSymmetry: Number = 0;
    idCtype = this.indiceservice.currentCoeficiente.idCtype;
    idSymmetry = this.indiceservice.currentSimetria.idSymmetry;
    const indiceactual: IndexTables = {
      idCtype: idCtype,
      idSymmetry: idSymmetry,
      indexNumber: Number(this.form.get('indexNumber')?.value),
      idIndex: this.idLlave
    }
    console.log (this.idLlave);
    console.log (indiceactual);
    this.plantillaindice.put (this.idLlave, indiceactual).subscribe ( data =>{
      this.toastr.success('Plantilla de indice de coeficiente actualizado');
      this.plantillaindice.getAllfitros(idCtype, idSymmetry);
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
        {
          indexNumber: 0
        });
      this.form.reset;
      this.idLlave = 0;
    })

 }
}
