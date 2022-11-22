import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inftecnica',
  templateUrl: './inftecnica.component.html',
  styleUrls: ['./inftecnica.component.css']
})
export class InftecnicaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  pasarporarriba(){
  console.log ('arriba');

  }
}
