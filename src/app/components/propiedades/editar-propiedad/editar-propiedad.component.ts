import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';



import { PropertiesM } from 'src/app/models/Properties';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-editar-propiedad',
  templateUrl: './editar-propiedad.component.html',
  styleUrls: ['./editar-propiedad.component.css']
})

export class EditarPropiedadComponent implements OnInit,OnDestroy {
  form    : FormGroup;
  suscripcion:  Subscription;
  property: PropertiesM;
  idMtypeLlave : Number=0;

  constructor( private formBuilder: FormBuilder,
    public propertyservice: PropertyService,
    private toastr: ToastrService ) {
      this.form = this.formBuilder.group (
        {
          idProperties: 0,
          nameProperties: ['', [Validators.required]]

        }
      )
    }

  ngOnInit(): void {
    //console.log("oninit edit");
    this.suscripcion = this.propertyservice.getAllTipos$().subscribe( data => {

      this.property = data as PropertiesM;
      //console.log (this.property);
      this.form.patchValue (
        {
          nameProperties: this.property.nameProperties,
        }
      );
      this.idMtypeLlave = this.property.idProperties || 0;
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
    const property: PropertiesM = {
      idProperties: 0,
      nameProperties: this.form.get('nameProperties')?.value,
    }
    this.propertyservice.postTipo (property).subscribe( data => {
      this.toastr.success('Tipo Agregado', 'Propiedad actualizada');
      this.propertyservice.getAllTipos();
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
      {
        nameProperties: ''
      });
    this.form.reset;
    });


  }

  editar (){
    console.log ('editar');
    const property: PropertiesM = {
      idProperties: this.property.idProperties,
      nameProperties: this.form.get('nameProperties')?.value,
    }
    this.propertyservice.putTipo (this.idMtypeLlave, property).subscribe ( data =>{
      this.toastr.success('Tipo Actualizado', 'Propiedad actualizada');
      this.propertyservice.getAllTipos();
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
        {
          nameProperties: ''
        });
      this.form.reset;
      this.idMtypeLlave =0;
    })

 }
}
