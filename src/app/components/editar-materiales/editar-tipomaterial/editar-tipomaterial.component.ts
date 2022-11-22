import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { MaterialTypesM } from 'src/app/models/MaterialTypes';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';


@Component({
  selector: 'app-editar-tipomaterial',
  templateUrl: './editar-tipomaterial.component.html',
  styleUrls: ['./editar-tipomaterial.component.css']
})

export class EditarTipomaterialComponent implements OnInit, OnDestroy {
  form    : FormGroup;
  suscripcion:  Subscription;
  tipomaterial: MaterialTypesM;
  idMtypeLlave : Number=0;

  constructor( private formBuilder: FormBuilder,
    public tipomateriaservice: MaterialTypeService,
    private toastr: ToastrService ) {
      this.form = this.formBuilder.group (
        {
          idMtype: 0,
          nameMtype: ['', [Validators.required]],
          descriptionMtype: ['', [Validators.required]]
        }
      )
    }

  ngOnInit(): void {
      this.suscripcion = this.tipomateriaservice.getAllTipos$().subscribe( data => {

      this.tipomaterial = data as MaterialTypesM;
      //console.log (this.tipomaterial);
      this.form.patchValue (
        {
          nameMtype: this.tipomaterial.nameMtype,
          descriptionMtype: this.tipomaterial.descriptionMtype
        }
      );
      this.idMtypeLlave = this.tipomaterial.idMtype || 0;
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
    const tipoMaterial: MaterialTypesM = {
      idMtype: 0,
      nameMtype: this.form.get('nameMtype')?.value,
      descriptionMtype: this.form.get('descriptionMtype')?.value
    }
    this.tipomateriaservice.postTipo (tipoMaterial).subscribe( data => {
      this.toastr.success('Tipo Agregado', 'Tipos de material actualizado');
      this.tipomateriaservice.getAllTipos();
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
      {
        nameMtype: '',
        descriptionMtype: ''
      });
    this.form.reset;
    });


  }

  editar (){
    console.log ('editar');
    const tipoMaterial: MaterialTypesM = {
      idMtype: this.tipomaterial.idMtype,
      nameMtype: this.form.get('nameMtype')?.value,
      descriptionMtype: this.form.get('descriptionMtype')?.value
    }
    this.tipomateriaservice.putTipo (this.idMtypeLlave, tipoMaterial).subscribe ( data =>{
      this.toastr.success('Tipo Actualizado', 'Tipo de material actualizado');
      this.tipomateriaservice.getAllTipos();
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
        {
          nameMtype: '',
          descriptionMtype: ''
        });
      this.form.reset;
      this.idMtypeLlave =0;
    })

 }
}
