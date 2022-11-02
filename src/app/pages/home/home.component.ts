import { ControlersService } from './../../services/controlers.service'; 
import { Component, OnInit } from '@angular/core'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 

  constructor( 
              public _controService: ControlersService, 
              ) {   
  } 

  ngOnInit(): void {
    this._controService.listProcess();
    
  }
  reloadProcessys(){
    this._controService.ObtenerProccess();
  }
}
