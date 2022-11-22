import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { delay } from 'rxjs';
import { Coefficients } from 'src/app/models/Coefficients';
import { CoefficientsService } from 'src/app/services/coefficients.service';

@Component({
  selector: 'app-listar-coeficientes',
  templateUrl: './listar-coeficientes.component.html',
  styleUrls: ['./listar-coeficientes.component.css']
})

export class ListarCoeficientesComponent implements OnInit,OnChanges {
  @Input() idMaterial:Number;
  @Output() idMaterialSelected:Number;
  coeffList: Coefficients[];
  constructor(
    public coefficientService: CoefficientsService
  ) {
    this.coeffList = [];
   }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.idMaterial != undefined)
    {
      this.coefficientService.getAll_IdMaterial(this.idMaterial).subscribe(data => this.coeffList = data)
    }
  }
  ngOnInit(): void {
  }


}
