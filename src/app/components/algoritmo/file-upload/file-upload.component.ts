import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AlgorithmInfo } from '../../../models/AlgorithmInfo';
import { InternalserviceService } from 'src/app/components/editar-materiales/internalservice.service';
import { MaterialTypeService } from 'src/app/services/material-type-service.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})


export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  idllave : Number= 0;
  idselected: Number= 0;
  suscripcion: Subscription;
  tipomaterialseleccionado: Number;
  tipocompuestoseleccionado: string;
  tipogeometriaseleccionado: string;
  actualizarcambios: boolean;
  fileinfo: AlgorithmInfo;
  actualidfile: Number;
  // fileInfos?: AlgorithmInfo[];

  tiposgeometria : string[] = ["Serie","Paralelo","Cuadrada","Hexagonal"];
  tipocompuesto: string[] = ["Laminado","Fibroso"];

  constructor(public uploadService: FileUploadService,
    private toastr:ToastrService,
    public serviciointernoeditarmaterial : InternalserviceService,
    public tipomateriaservice: MaterialTypeService,  ) { }

  ngOnInit(): void {
    this.uploadService.getFiles();
    this.uploadService.fileInfo;
    this.tipomateriaservice.getAllTipos();
    this.actualizarcambios = true;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            // else if (event instanceof HttpResponse) {
            //   this.message = event.body.message;
            //   this.fileInfos = this.uploadService.getFiles();
            // }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'No puede subir este fichero!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }

  funcioncompuesto(compuesto : any){
    this.tipocompuestoseleccionado = compuesto;
    console.log (this.tipocompuestoseleccionado );
  }

  funciongeometria(geometria : any) {
    this.tipogeometriaseleccionado = geometria;
    console.log (this.tipogeometriaseleccionado );
  }

  funciontipomaterial(tipo : any){
    
    this.tipomaterialseleccionado = tipo.idMtype;
    console.log (this.tipomaterialseleccionado );
  }

  editarfichero(file : any){
    //console.log ('editar fichero')
    //console.log (file)
    this.tipomaterialseleccionado = file.idMtype;
    this.tipocompuestoseleccionado = file.tipocompuesto;
    this.tipogeometriaseleccionado = file.tipogeometria;
    this.fileinfo = file;
    this.actualidfile = file.idfile;
    this.actualizarcambios = false;
  }

  actualizarcambiosfile() {
    this.fileinfo.tipocompuesto = this.tipocompuestoseleccionado;
    this.fileinfo.tipogeometria = this.tipogeometriaseleccionado;
    this.fileinfo.idMtype = this.tipomaterialseleccionado;
    console.log (this.fileinfo);
    this.uploadService.putTipo ( this.fileinfo.idfile , this.fileinfo).subscribe ( data => {
      this.toastr.success('Propiedades del algoritmo actualizadas');
      this.uploadService.getFiles();
      this.uploadService.fileInfo;
      this.tipomateriaservice.getAllTipos();
      this.actualizarcambios = true;
      this.actualidfile=0;
      this.tipomaterialseleccionado = 0;
      this.tipocompuestoseleccionado = "";
      this.tipogeometriaseleccionado = "";
    }) 

   
  }
  guardarTipo(){
    if(this.idllave === 0){
      this.agregar();
    } else {
      this.editar();
    }
  }
  ngOnDestroy(): void {
    if(this.suscripcion)
    {
      this.suscripcion.unsubscribe();
    }
  }
  agregar()
  {
    const funcion: AlgorithmInfo =
    {
      idfile: 0,
      nombrefile: this.currentFile?.name|| " ",
      descripcion: this.currentFile?.name||" ",
      idMtype:  this.tipomaterialseleccionado,
      tipocompuesto: this.tipocompuestoseleccionado,
      tipogeometria:  this.tipogeometriaseleccionado,
    }
    this.uploadService.postTipo(funcion).subscribe(data =>
      {
        this.toastr.success('Funcion Guardada');
        this.uploadService.getFiles();
      });
  }
  editar(){

    const funcion: AlgorithmInfo =
    {
      idfile: 0,
      nombrefile: this.currentFile?.name|| " ",
      descripcion: this.currentFile?.name||" ",
      idMtype: 1,
      tipocompuesto: "Fibroso",
      tipogeometria: "Hexagonal",
    };
    this.uploadService.putTipo (1, funcion).subscribe ( data =>{
      this.toastr.success('Archivo actualizado');
      this.uploadService.getFiles();
    })
  }


  uploadAndUpdate()
  {
    this.upload();
    this.agregar();
  }
}

