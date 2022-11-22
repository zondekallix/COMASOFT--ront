export class RequestFunctionDataM{
  idMaterialType: Number;
  nameGeometry: string;
  compositeName: string
  public constructor(idM:Number,nameGeo:string,compositeName:string)
  {
    this.idMaterialType = idM;
    this.nameGeometry = nameGeo;
    this.compositeName = compositeName;
  }
}
