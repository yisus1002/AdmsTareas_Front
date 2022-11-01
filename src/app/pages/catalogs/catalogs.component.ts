import { ControlersService } from './../../services/controlers.service';
import { AdmstareasService } from './../../services/admstareas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {

  constructor( private _sAdms: AdmstareasService,
               private _sContr: ControlersService) {
                this.loadCatalog();
                }

  ngOnInit(): void {
  }

  creteCatalog(name: object){
    this._sContr.crateCatalogue(name);
  }

  loadCatalog(){
    this._sAdms.getCatalogue()
    .subscribe({
      next: ((data:any)=>{
        console.log(data);
      }),
      error: ((error:any)=>{
        console.log(error);
        
      })
    })
  }


}
