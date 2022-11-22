import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { CoefficientTypes } from 'src/app/models/CoefficientType';
import { CoefficientTypesViewService } from 'src/app/services/coef-types-view.service';
import { CoefficientTypesService } from 'src/app/services/coefficient-types.service';
import { PropertyService } from 'src/app/services/property.service';


@Component({
  selector: 'app-editar-coeficiente',
  templateUrl: './editar-coeficiente.component.html',
  styleUrls: ['./editar-coeficiente.component.css']
})

export class EditarCoeficienteComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscripcion: Subscription;
  tipocoeficiente: CoefficientTypes;
  idllave : Number= 0;
  idselected: Number= 0;

  constructor( private formBuilder: FormBuilder,
    public coeficienteservice: CoefficientTypesService,
    public propiedadservice: PropertyService,
    public coeficientetipoViewservice: CoefficientTypesViewService,
    private toastr: ToastrService ) {
      this.form = this.formBuilder.group (
        {
          idCtype: 0,
          nameCtype: ['', [Validators.required]],
          prefix: ['', [Validators.required]],
          measureUnit: ['', [Validators.required]],
          idProperties: [0, [Validators.required]]
        }

      )

    }

  ngOnInit(): void {
    console.log ('en el init void editar coef')
    this.suscripcion = this.coeficienteservice.getAll$().subscribe( data => {
      this.tipocoeficiente = data as CoefficientTypes;
      console.log (this.tipocoeficiente);
      this.propiedadservice.getAllTipos();
      this.idselected= this.tipocoeficiente.idProperties;
      this.form.patchValue (
        {
          nameCtype: this.tipocoeficiente.nameCtype,
          prefix: this.tipocoeficiente.prefix,
          measureUnit: this.tipocoeficiente.measureUnit,
          idProperties: this.idselected
        }
      );

      this.idllave = this.tipocoeficiente.idCtype || 0;
    })

  }

  guardarTipo (){
    //esto es para ver si es una edicion o es una actualizacion
    console.log ('guardar tipo');
    console.log (this.idllave);
    if(this.idllave === 0){
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

  agregar(){
    const coeficiente: CoefficientTypes = {
      idCtype: 0,
      nameCtype: this.form.get('nameCtype')?.value,
      prefix: this.form.get('prefix')?.value,
      measureUnit: this.form.get('measureUnit')?.value,
      idProperties: this.idselected//this.form.get('dropPropiedad')?.value
    }
    console.log (coeficiente);
    this.coeficienteservice.post (coeficiente).subscribe( data => {
      this.toastr.success('Coeficiente Agregado');
      this.coeficientetipoViewservice.getAll();
      this.idselected = 0;
      this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
      {
          idCtype: 0,
          nameCtype: '',
          prefix: '',
          measureUnit: '',
          idProperties: this.idselected
      });
      this.form.reset;
    });

  }

  editar(){
    const coeficiente: CoefficientTypes = {
      idCtype: this.idllave,
      nameCtype: this.form.get('nameCtype')?.value,
      prefix: this.form.get('prefix')?.value,
      measureUnit: this.form.get('measureUnit')?.value,
      idProperties: this.idselected//this.form.get('dropPropiedad')?.value
    }
    console.log ('editar coeficiente');
    console.log (coeficiente);

    this.coeficienteservice.put (this.idllave, coeficiente).subscribe ( data => {
      this.toastr.success('coeficiente Actualizado');
      this.coeficientetipoViewservice.getAll();
      this.idselected = 0;
      this.form.patchValue(
        {
          idCtype: 0,
          nameCtype: '',
          prefix: '',
          measureUnit: '',
          idProperties: this.idselected
        })
        this.idllave=0;
        this.form.reset;
    })
  }

  onChangeDrop( event : any) {
    let selectedLaw : any = event.target.value;
    this.idselected = Number(selectedLaw);
    console.log ( selectedLaw);
    console.log ( event.target.value );
    //this.idselected= 0;
  }
}
