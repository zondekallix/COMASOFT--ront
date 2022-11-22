import { Injectable } from '@angular/core';
import { Coefficients } from 'src/app/models/Coefficients';
import { IndexTables } from 'src/app/models/IndexTables';
import { MaterialDataTypSyms } from 'src/app/models/MaterialDataTypSyms';

@Injectable({
  providedIn: 'root'
})
export class InternalService {
 public currentMaterialId : Number;
 public currentMaterialDataTypSyms: MaterialDataTypSyms;
 public tablaindicesdisponibles : IndexTables[];
 public coeficienteexistente : Coefficients [];

 public idSymmetry : Number; //va a tener el id de simetria seleccionado en la lista de materiales

  constructor() { }
}
