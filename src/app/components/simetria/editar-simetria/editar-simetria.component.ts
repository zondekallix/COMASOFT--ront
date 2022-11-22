import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SymmetryM } from 'src/app/models/Symmetry';
import { SymmetryServiceService } from 'src/app/services/symmetry-service.service';

@Component({
  selector: 'app-editar-simetria',
  templateUrl: './editar-simetria.component.html',
  styleUrls: ['./editar-simetria.component.css']
})
export class EditarSimetriaComponent implements OnInit {

  form    : FormGroup;
  suscripcion:  Subscription;
  symmetry: SymmetryM;
  idMtypeLlave : Number=0;

  constructor( private formBuilder: FormBuilder,
    public symmetryservice: SymmetryServiceService,
    private toastr: ToastrService ) {
      this.form = this.formBuilder.group (
        {
          idMtype: 0,
          symmetryName: ['', [Validators.required]],
          descriptionSymmetry: ['', [Validators.required]]
        }
      )
    }

  ngOnInit(): void {
    //console.log("oninit edit");
    this.suscripcion = this.symmetryservice.getAllTipos$().subscribe( data => {

      this.symmetry = data as SymmetryM;
      //console.log (this.symmetry);
      this.form.patchValue (
        {
          symmetryName: this.symmetry.symmetryName,
          descriptionSymmetry: this.symmetry.descriptionSymmetry
        }
      );
      this.idMtypeLlave = this.symmetry.idSymmetry || 0;
    })

  }

  guardarTipo (){
    //esto es para ver si es una edicion o es una actualizacion
    if(this.idMtypeLlave === 0){
      this.agregar();
    } else {
      this.editar();
    }
  }

  ngOnDestroy(): void {
    if (this.suscripcion)
    {
      this.suscripcion.unsubscribe();
    }
  }

  agregar (){
    console.log ('insertar');
    const symmetry: SymmetryM = {
      idSymmetry: 0,
      symmetryName: this.form.get('symmetryName')?.value,
      descriptionSymmetry: this.form.get('descriptionSymmetry')?.value,
    }
    this.symmetryservice.postTipo (symmetry).subscribe( data => {
      this.toastr.success('Tipo Agregado', 'Propiedad actualizada');
      this.symmetryservice.getAllTipos();
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
      {
        symmetryName: '',
        descriptionSymmetry: ''
      });
    this.form.reset;
    });


  }

  editar (){
    console.log ('editar');
    const symmetry: SymmetryM = {
      idSymmetry: this.symmetry.idSymmetry,
      symmetryName: this.form.get('symmetryName')?.value,
      descriptionSymmetry: this.form.get('descriptionSymmetry')?.value,
    }
    this.symmetryservice.putTipo (this.idMtypeLlave, symmetry).subscribe ( data =>{
      this.toastr.success('Tipo Actualizado', 'Propiedad actualizada');
      this.symmetryservice.getAllTipos();
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
        {
          symmetryName: '',
          descriptionSymmetry: ''
        });
      this.form.reset;
      this.idMtypeLlave =0;
    })

 }
}
