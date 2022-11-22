import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AlgorithmInfo } from 'src/app/models/AlgorithmInfo';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-editar-algoritmo',
  templateUrl: './editar-algoritmo.component.html',
  styleUrls: ['./editar-algoritmo.component.css']
})
export class EditarAlgoritmoComponent implements OnInit {
  MAX_SIZE: number = 10048576;
  theFile: any = null;
  messages: string[] = [];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {

  }

  onFileChange ( event : any){


  }


    
}
