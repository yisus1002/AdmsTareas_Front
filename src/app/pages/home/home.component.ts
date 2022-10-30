import { AdmstareasService } from './../../services/admstareas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _admsService: AdmstareasService) { 

    // this._admsService
    // this._admsService.getAdms().subscribe((adms:any)=>
    // console.log(adms))
  }

  ngOnInit(): void {
  }

}
