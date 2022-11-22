import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes, ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-sup-navbar',
  templateUrl: './sup-navbar.component.html',
  styleUrls: ['./sup-navbar.component.scss']
})
export class SupNavbarComponent implements OnInit {

  elementosdropmenu = [
    {informacion : "Propiedades", link: "propiedad"},
    {informacion : "Tipos de Coeficientes", link: "coeficiente"},
    {informacion : "Tipos de Simetria", link: "simetria"},
    {informacion : "Tipo de Material", link: "material"},
    {informacion : "Indices premitidos de Coeficientes", link: "plantillaindice"},
    {informacion : "Coeficientes por Materiales", link: "coeficientevalor"},
    {informacion : "Algoritmos MatLab", link: "algoritmo"}
    

  ]
  constructor( private router: ActivatedRoute,
    private routerto: Router) { }

  ngOnInit(): void {


  }

  goToRoute(indice : Number) {
    console.log (this.router);
  }


  onChangeDrop( event : any) {
    let selectedLaw : any = event.target.value;
    //this.idselected = Number(selectedLaw);
    console.log (event.target );
    console.log ( selectedLaw );
    this.routerto.navigate(['/', selectedLaw]);
    //this.idselected= 0;
  }

}
