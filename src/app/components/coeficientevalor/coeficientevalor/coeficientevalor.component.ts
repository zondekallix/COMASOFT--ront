import { Component, OnInit } from '@angular/core';
import { InternalService } from '../internal.service';

@Component({
  selector: 'app-coeficientevalor',
  templateUrl: './coeficientevalor.component.html',
  styleUrls: ['./coeficientevalor.component.css']
})
export class CoeficientevalorComponent implements OnInit {

  constructor( public internalservice: InternalService ) { }

  ngOnInit(): void {

    this.internalservice.idSymmetry;
  }

}
