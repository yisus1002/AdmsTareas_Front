import { ControlersService } from './../../services/controlers.service'; 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {


  constructor( 
               public _sContr: ControlersService) {
                this._sContr.loadCatalog();
                }

  ngOnInit(): void {
  }

  creteCatalog(name: object){
    this._sContr.crateCatalogue(name);
  }

 
}
