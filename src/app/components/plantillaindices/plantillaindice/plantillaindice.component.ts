import { Component, OnInit } from '@angular/core';
import { IndiceLocalService } from '../indicelocal.service';

@Component({
  selector: 'app-plantillaindice',
  templateUrl: './plantillaindice.component.html',
  styleUrls: ['./plantillaindice.component.css']
})
export class PlantillaindiceComponent implements OnInit {
 

  constructor( public indiceservice: IndiceLocalService) { }

  ngOnInit(): void {
   
  }



}
