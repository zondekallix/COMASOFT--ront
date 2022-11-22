import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MaterialDataTypSyms } from 'src/app/models/MaterialDataTypSyms';
import { Materials } from 'src/app/models/Materials';
import { MaterialDataTypSymsService } from 'src/app/services/material-data-typ-syms.service';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';
import { MaterialsService } from 'src/app/services/materials.service';
import { SymmetryServiceService } from 'src/app/services/symmetry-service.service';

@Component({
  selector: 'app-editmateriales',
  templateUrl: './editmateriales.component.html',
  styleUrls: ['./editmateriales.component.css']
})
export class EditmaterialesComponent implements OnInit {


  form    : FormGroup;
  suscripcion:  Subscription;
  material: MaterialDataTypSyms;
  idLlave : Number=0;
  idTipoSelected: Number = 0 ;
  idSymSelected: Number = 0 ;

  constructor(private formBuilder: FormBuilder,
    public materialservice: MaterialsService,
    public materialdataservice : MaterialDataTypSymsService,
    public tipomaterialservice: MaterialTypeService,
    public tiposimetriaservice: SymmetryServiceService,
    public tipoMaterialViewservice: MaterialDataTypSymsService,
    private toastr: ToastrService
    ) {
      tipomaterialservice.getAllTipos();
      tiposimetriaservice.getAllTipos();
      this.form = this.formBuilder.group (
        {
          idMtype                     :0,
          nameMaterial                :['', [Validators.required]],
          description                 :['', [Validators.required]],
          idMaterial                  :0,
          idSymmetry                  :0
          // angle                       :['', [Validators.required]],
          // cellGeometry                :['', [Validators.required]],
          // sheerGeometry               :['', [Validators.required]],
          // materialDiscriminator       :0
        }
      )

    }

  ngOnInit(): void {
    this.suscripcion = this.materialdataservice.getAll$().subscribe( data => {

      this.material = data as MaterialDataTypSyms;
      //console.log (this.material);
      this.idTipoSelected = this.material.idMType;
      this.idSymSelected = this.material.idSymmetry;
      this.form.patchValue (
        {
          idMaterial                  :0,
          nameMaterial                :this.material.nameMaterial,
          description                 :this.material.description,
          idMtype                     :this.idTipoSelected,
          idSymmetry                  :this.idSymSelected
          // angle                       :['', [Validators.required]],
          // cellGeometry                :['', [Validators.required]],
          // sheerGeometry               :['', [Validators.required]],
          // materialDiscriminator       :0
        }
      );
      this.idLlave = this.material.idMaterial || 0;
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
    }
  }

  agregar (){
    console.log ('insertar');
    if (this.idTipoSelected > 0 && this.idSymSelected>0){


      const material: Materials = {
        idMaterial: this.idLlave,
        nameMaterial:this.form.get('nameMaterial')?.value,
        description: this.form.get('description')?.value,
        idMtype: this.idTipoSelected,
        idSymmetry: this.idSymSelected
        // angle: '',
        // cellGeometry: '',
        // sheerGeometry: '',
        // materialDiscriminator: 0
      }
      console.log (material);
      this.materialservice.postTipo (material).subscribe( data => {
        this.toastr.success('Material Agregado');
        this.materialservice.getAllTipos();
        this.tipoMaterialViewservice.getAll();
        this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
        {
          symmetryName: '',
          descriptionSymmetry: ''
        });
      this.form.reset;
      });

    }
  }

  editar (){
    console.log ('editar');
      if (this.idTipoSelected > 0 && this.idSymSelected>0){
      const material: Materials = {
        idMaterial: this.idLlave,
        nameMaterial:this.form.get('nameMaterial')?.value,
        description: this.form.get('description')?.value,
        idMtype: this.idTipoSelected,
        idSymmetry: this.idSymSelected
        // angle: '',
        // cellGeometry: '',
        // sheerGeometry: '',
        // materialDiscriminator: 0
      }
      console.log (this.idLlave);
      console.log (material);

      this.materialservice.putTipo (this.idLlave, material).subscribe ( data =>{
        this.toastr.success('Material Actualizado');
        this.materialservice.getAllTipos();
        this.tipoMaterialViewservice.getAll();
        this.form.patchValue (//tuve que poner esto porque el reset no me funciono.
          {
            idMtype: 0,
            nameMaterial:'',
            description:'',
            idMaterial: 0,
            idSymmetry: 0
          });
        this.form.reset;
        this.idLlave =0;
        this.idTipoSelected = 0;
        this.idSymSelected =0;
      })
    }
 }

 onChangeDrop( event : any) {
  let selected : any = event.target.value;
  this.idTipoSelected = Number(selected);
  // console.log ( selected);
  // console.log ( event.target.value );
  //this.idselected= 0;
}

onChangeDropSimetria( event : any) {
  let selected : any = event.target.value;
  this.idSymSelected = Number(selected);
  // console.log ( selected);
  // console.log ( event.target.value );
  //this.idselected= 0;
}

}
