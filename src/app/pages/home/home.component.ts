import { ControlersService } from './../../services/controlers.service';
import { AdmstareasService } from './../../services/admstareas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public forma !:FormGroup;

  constructor(private _admsService: AdmstareasService,
              public _controService: ControlersService,
              private form: FormBuilder,
              ) { 
                this.createForm();
    // this._admsService
    // this._admsService.getAdms().subscribe((adms:any)=>
    // console.log(adms))
  }
  get nameNovalid(){
    return  this.forma.get('name')?.invalid && this.forma.get('name')?.touched;
  }

  ngOnInit(): void {
    this._controService.listProcess();
    
  }
  reloadProcessys(){
    this._controService.ObtenerProccess();
  }

  createForm(){
    this.forma = this.form.group({
      name: ["", [Validators.required, Validators.minLength(4)], []]
    })
  }

  createCata(){
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(controls=>{
        controls.markAllAsTouched();
      })
    }else{
      console.log(this.forma.value)
      this._controService.crateCatalogue(this.forma.value);
      this.loadForm();
    }
  }

  loadForm(){
    this.forma.reset({
      name: ""
    })
  }


}
